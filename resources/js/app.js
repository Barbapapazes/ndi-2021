import '../css/app.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Water } from 'three/examples/jsm/objects/Water.js'
import { Sky } from 'three/examples/jsm/objects/Sky.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as TWEEN from '@tweenjs/tween.js'

function boat() {
  const LIMIT = 6
  let camera
  let scene
  let renderer
  let controls
  let sun
  let water
  let sky
  let clock
  let ambientLight
  let mouseY = 2
  let pmremGenerator
  let needupdate = false

  let loader = new GLTFLoader()
  let textureLoader = new THREE.TextureLoader()

  let ID

  function waving(obj, amplitude = 0.8, base = 0.2) {
    let tw = { alt: obj.position.y, rotx: obj.rotation.x, rotz: obj.rotation.z }
    let old_tw = { alt: obj.position.y, rotx: obj.rotation.x, rotz: obj.rotation.z }
    let coef = Math.random() * amplitude + base
    // let coef = Math.random()*0.01

    new TWEEN.Tween(tw)
      .to(
        {
          alt: obj.position.y + coef * 2,
          rotx: obj.rotation.x + coef * -old_tw.rotx,
          rotz: obj.rotation.z + coef * -old_tw.rotz,
        },
        1000
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        obj.position.y = tw.alt
        obj.rotation.x = tw.rotx
        obj.rotation.z = tw.rotz
      })
      .start()
      .onComplete(() => {
        new TWEEN.Tween(tw)
          .to({ alt: old_tw.alt, rotx: old_tw.rotx, rotz: old_tw.rotz }, 1000)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate(() => {
            obj.position.y = tw.alt
            obj.rotation.x = tw.rotx
            obj.rotation.z = tw.rotz
          })
          .start()
          .onComplete(() => {
            waving(obj, amplitude)
          })
      })
  }

  class Trash {
    setup(type) {
      this.x = Math.random() * 4 - 2
      this.y = Math.random() * 4 - 2
      this.z = Math.random() * 20
      this.velocity = {
        x: (Math.random() - 0.5) * 0.1,
        y: 0,
        z: (Math.random() - 0.5) * 0.1 - 0.08,
      }
      //   this.v = new THREE.Vector2().random().subScalar(0.5).multiplyScalar(0.0001);

      // this.x = this.r * Math.cos(this.phi);
      // this.y = this.r * Math.sin(this.phi) * Math.sin(this.theta);
      // this.z = this.r * Math.sin(this.phi) * Math.cos(this.theta);

      //   this.size = Math.random() * 4 + 0.5 * pixelRatio;
      //   this.color = color;
    }

    update() {
      this.x += this.velocity.x
      if (this.x < POS_MAX) {
        this.x += 20
      }
    }
  }

  function init() {
    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('ThreeCanvas'),
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.innerWidth / window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping

    //clock
    clock = new THREE.Clock()
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000)
    camera.position.set(30, 30, 100)

    // Sun
    sun = new THREE.Vector3()

    //adding ambient light
    ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    // Water
    const waterGeometry = new THREE.PlaneGeometry(1500, 1000)
    water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('/assets/waternormals.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      }),
      alpha: 0.9,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 2, //3.7,
      fog: scene.fog !== undefined,
    })
    water.rotation.x = -Math.PI / 2
    water.position.z = -250
    // water.material.alphaToCoverage = true;
    scene.add(water)
    console.log(water)

    // Skybox
    sky = new Sky()
    sky.scale.setScalar(10000)
    scene.add(sky)

    const skyUniforms = sky.material.uniforms

    skyUniforms['turbidity'].value = 10
    skyUniforms['rayleigh'].value = 2
    skyUniforms['mieCoefficient'].value = 0.005
    skyUniforms['mieDirectionalG'].value = 0.8

    pmremGenerator = new THREE.PMREMGenerator(renderer)

    function updateSun(angle = 2) {
      const phi = THREE.MathUtils.degToRad(90 - angle)
      const theta = THREE.MathUtils.degToRad(180)

      sun.setFromSphericalCoords(1, phi, theta)

      sky.material.uniforms['sunPosition'].value.copy(sun)
      water.material.uniforms['sunDirection'].value.copy(sun).normalize()
    }

    updateSun()
    scene.environment = pmremGenerator.fromScene(sky).texture

    let ship
    loader.load(
      '/assets/ship.glb',
      function (gltf) {
        gltf.scene.position.set(0, -5, 0)
        gltf.scene.rotation.set(Math.PI / 100, 0, -Math.PI / 50)
        gltf.scene.scale.set(8, 8, 8)
        gltf.scene.name = 'Ship'
        scene.add(gltf.scene)
        ship = scene.children[scene.children.findIndex((child) => child.name === 'Ship')]
        console.log('Loaded Ship:', ship)
        waving(ship)
      },
      undefined,
      function (error) {
        console.error(error)
      }
    )

    // controls = new OrbitControls( camera, renderer.domElement );
    // controls.maxPolarAngle = Math.PI * 0.495;
    // controls.target.set( 0, 10, 0 );
    // controls.minDistance = 40.0;
    // controls.maxDistance = 200.0;
    // controls.update();

    //

    // // Trash

    // let trash = new THREE.Group()

    // //sphere mesh with texture
    // let sphereGeometry = new THREE.SphereGeometry( 2.5, 32, 32 );
    // let sphereMaterial = new THREE.MeshPhongMaterial( {
    // 	map: textureLoader.load( 'assets/trash.jpg' ),
    // 	opacity: 0.8
    // } );
    // let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    // sphere.position.set(0,0.5,30)

    // scene.add(sphere)
    // waving(sphere, 0.5, 0)

    // // trash.name = "Trash"
    // // scene.add(trash)

    //

    window.addEventListener('resize', onWindowResize)

    //add event listener on wheelevent
    document.addEventListener(
      'wheel',
      (e) => {
        //update an angle from 0 to 360 with scroll
        if (-LIMIT * 2 <= mouseY && mouseY <= LIMIT) {
          mouseY = (mouseY + e.deltaY / -500) % 360
          mouseY = mouseY > LIMIT ? LIMIT : mouseY < -2 * LIMIT ? -2 * LIMIT : mouseY
          updateSun(mouseY)
          needupdate = true
        }
      },
      false
    )
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  function animate() {
    TWEEN.update()

    ID = requestAnimationFrame(animate)
    render()
  }

  //Render function
  function render() {
    //Get time by clock
    let time = clock.getElapsedTime()
    if (needupdate) {
      needupdate = false
      scene.environment = pmremGenerator.fromScene(sky).texture
    }
    water.material.uniforms['time'].value += 1.0 / 60.0
    //   controls.update()
    renderer.render(scene, camera)
  }

  init()
  animate()
}

boat()

function menu() {
  const modal = document.querySelector('#Modal')
  const textsModal = document.querySelectorAll('.text-modal')
  const modalCategories = document.querySelectorAll('.modal-category')
  // console.log(modal.style)
  // console.log(textsModal)
  let modalParent = document.querySelector('#ModalParent')

  let data = {
    'Sauveteurs': {
      "Tableau d'honneur": null,
      'Qui étaient-ils ?': null,
      'Que faisaient-ils ?': {
        'Douaniers et Sauveteurs': null,
        'Lamaneur et Sauveteur': null,
        'Pilote et Sauveteur': null,
        'Remorquage et Sauvetage': null,
        'Marins islandais et Sauveteurs': null,
      },
      'Paroles de': null,
      'Gratifications': null,
      "Sauveteurs d'ailleurs": null,
    },
    'Sorties en mer': {
      '18ème siècle': null,
      '19ème siècle': {
        '1800 - 1824': null,
        '1825 - 1849': null,
        '1850 - 1859': null,
        '1860 - 1869': null,
        '1870 - 1879': null,
        '1880 - 1889': null,
        '1890 - 1899': null,
      },
      '20ème siècle': {
        '1900 - 1909': null,
        '1910 - 1919': null,
        '1920 - 1929': null,
        '1930 - 1939': null,
        '1940 - 1949': null,
        'Bataille de Dunkerque': null,
        '1950 - 1959': null,
        '1960 - 1969': null,
        '1970 - 1979': null,
        '1980 - 1989': null,
        '1990 - 1999': null,
      },
      'SNSM XXIème': {
        'SNSM 2000 - 2009': null,
        'SNSM 2010 - 2019': null,
        'SNSM 2020 - 2029': null,
      },
    },
    'Stations': {
      'Dunkerkque': null,
      'Gravelines': null,
      'Fort-Mardyck': null,
      'Malo-les-Bains': null,
      'Bray-Dunes': null,
    },
    'Services du port': {
      'Douanes': null,
      'Lamanage': null,
      'Pilotage': null,
      'Ponts-et-Chaussées': {
        'Phares-et-Balises': null,
        'Marégraphes': null,
      },
      'Remorquage': null,
    },
    'Moyens maritimes': {
      'Les canots dunkerquois': null,
      'Canots fort-mardyckois': null,
      'Les canots gravelinois': null,
      'Canot Malo-les-Bains': null,
      'Pilotage les moyens maritimes': null,
      'Remorqueurs dunkerquois': null,
    },
    'Techniques': {
      'Matériels': {
        'Ligne Brunel': null,
        'Ligne Torres': null,
        'Gaffe Legrand': null,
        'Canon porte amarre': null,
        'Fusil porte-Amarre': null,
        'Flèche Delvigne': null,
        'Sauveteur Ceinture 1870': null,
      },
      'Sauvetage des personnes': null,
      'Va-et-vient': null,
    },
    'Historique': {
      'Ephéméride du sauvetage': null,
      '40 ans de Société Humaine': null,
      'Société Centrale de Sauvetage des Naufragés': null,
      'Société Nationale de Sauvetage en Mer': null,
      'Les comités locaux': null,
    },
    'Compléments': {
      'Art et sauvetage': null,
      'Bibliographie': null,
      'Décorations et récompenses': null,
      'Description des bateaux': null,
      'Galerie Photo': null,
      'Fortunes de mer': null,
    },
    'Estaminet': null,
  }

  function createSubmodal(data) {
    let subModals = []
    for (const [key, value] of Object.entries(data)) {
      let container = document.createElement('div')
      container.className = 'hidden flex flex-col p-2 w-full'
      container.id = key.replaceAll(' ', '').toLowerCase() + 'Modal'
      if (value != null) {
        for (const [elem, v] of Object.entries(value)) {
          if (v == null) {
            let div = document.createElement('div')
            div.className = 'w-full flex flex-row items-center align-center justify-between h-14'
            let h1 = document.createElement('h1')
            h1.className = 'text-modal text-2xl font-bold text-white leading-normal'
            h1.innerText = elem
            div.appendChild(h1)
            container.appendChild(div)
          } else {
            createSubmodal(v).forEach((e) => {
              container.appendChild(e)
            })
          }
        }
      }
      subModals.push(container)
    }
    return subModals
  }

  console.log(createSubmodal(data))

  function fade(el, time, to) {
    let tween = new TWEEN.Tween(el.style)
      .to({ opacity: to }, time)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
  }

  //event listener mouse enter the modal
  modal.addEventListener('mouseenter', () => {
    modal.style.width = '300px'
    setTimeout(() => {
      TWEEN.removeAll()
      textsModal.forEach((text) => {
        text.style.display = 'block'
        text.style.opacity = '0'
        fade(text, 250, 1)
      })
    }, 150)
  })

  //event listener mouse leave the modal
  modal.addEventListener('mouseleave', () => {
    TWEEN.removeAll()
    textsModal.forEach((text) => {
      text.style.opacity = '0'
      text.style.display = 'none'
    })
    modal.style.width = '5rem'
  })

  //event listener click on each modal category
  modalCategories.forEach((element) => {
    element.addEventListener('click', () => {
      modalParent.style.display = 'none'

      console.log(element.children[0].innerHTML)
      let modalName = element.children[0].innerHTML.replace(/\s/g, '').toLowerCase()
      console.log(modalName, `#${modalName}Modal`)
      let toOpen = document.querySelector(`#${modalName}Modal`)
      console.log(toOpen)
      toOpen.style.display = 'block'
      toOpen.addEventListener('mouseleave', () => {
        modalParent.style.display = 'block'
        toOpen.style.display = 'none'
      })
    })
  })

  // Request animation frame loop function
  function animate() {
    requestAnimationFrame(animate)
    TWEEN.update()
  }

  animate()
}

menu()
