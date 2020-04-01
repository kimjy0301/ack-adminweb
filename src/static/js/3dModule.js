import * as THREE from "three";
import { WEBGL } from "three/examples/jsm/WebGL";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as monitor from "../../static/3d/monitor.glb";
import * as marbleFloor from "../../static/3d/marbleFloor.glb";
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper";
import { DragControls } from "three/examples/jsm/controls/DragControls";
let renderer,
  scene,
  camera,
  div3d,
  gltfLoader,
  objMonitor,
  objFloor,
  manager,
  orbitControls,
  dragControls,
  testBtn,
  group,
  draggableObjects;
let mouse = new THREE.Vector2(),
  raycaster = new THREE.Raycaster();
let enableSelection = false;
let objects = [];
export let isLoading = true;

export function init() {
  div3d = document.getElementById("div3d");
  testBtn = document.getElementById("testBtn");

  testBtn.addEventListener(
    "click",
    () => (orbitControls.enabled = !orbitControls.enabled)
  );

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  var pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.update();

  if (WEBGL.isWebGLAvailable()) {
    div3d.appendChild(renderer.domElement);
    animate();
  } else {
    var warning = WEBGL.getWebGLErrorMessage();
    div3d.appendChild(warning);
  }

  scene.background = new THREE.Color(0x0b0d0f);
  scene.fog = new THREE.Fog(0x0b0d0f, 500, 10000);

  window.addEventListener("resize", onWindowResize, false);

  manager = new THREE.LoadingManager();
  manager.onStart = function(url, itemsLoaded, itemsTotal) {
    console.log(
      "Started loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
    isLoading = true;
  };

  manager.onLoad = function() {
    console.log("Loading complete!");
    isLoading = false;
  };

  manager.onProgress = function(url, itemsLoaded, itemsTotal) {
    console.log(
      "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  manager.onError = function(url) {
    console.log("There was an error loading " + url);
  };

  MonitorGLTFLoad(monitor);
  FloorGLTFLoad(marbleFloor);

  var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);

  light = new THREE.DirectionalLight(0xffffff, 2, 1000);
  light.castShadow = true;
  light.position.set(2, 2, 2);
  scene.add(light);

  camera.position.z = 10;
  camera.position.y = 5;
  camera.rotateX(Math.PI / -7);

  group = new THREE.Group();
  scene.add(group);

  dragControls = new DragControls([...objects], camera, renderer.domElement);
  dragControls.addEventListener("dragstart", onDragStart, false);
  dragControls.addEventListener("dragend", onDragEnd, false);
  document.addEventListener("click", onClick, false);
  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);
}
function onKeyDown(event) {
  enableSelection = event.keyCode === 16 ? true : false;
}

function onKeyUp() {
  enableSelection = false;
}
function onClick(event) {
  event.preventDefault();

  if (enableSelection === true) {
    draggableObjects = dragControls.getObjects();

    draggableObjects.length = 0;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersections = raycaster.intersectObjects(objects, true);

    if (intersections.length > 0) {
      for (let index = 0; index < intersections.length; index++) {
        var object = intersections[index].object;

        if (group.children.includes(object) === true) {
          object.material.emissive.set(0x000000);
          scene.attach(object);
        } else {
          object.material.emissive.set(0xaaaaaa);
          group.attach(object);
        }

        dragControls.transformGroup = true;
        draggableObjects.push(group);
      }

      // if (group.children.length === 0) {
      //   dragControls.transformGroup = false;
      //   draggableObjects.push(...objects);
      // }
    }
  }
  animate();
}

function onDragStart() {
  orbitControls.enabled = false;
}
function onDragEnd() {
  orbitControls.enabled = true;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function MonitorGLTFLoad(url) {
  let roughnessMipmapper = new RoughnessMipmapper(renderer);
  gltfLoader = new GLTFLoader(manager);
  gltfLoader.load(url, gltf => onSuccess(gltf));

  roughnessMipmapper.dispose();

  function onSuccess(gltf) {
    gltf.scene.traverse(function(node) {
      if (node.isMesh) {
        node.castShadow = true;
        roughnessMipmapper.generateMipmaps(node.material);
        objects.push(node);
      }
    });
    let mesh = gltf.scene.children[0];
    mesh.name = "objMonitor";
    mesh.rotateY(-1);
    mesh.position.y = 1.2;
    scene.add(mesh);
    objMonitor = mesh;
  }
}

function FloorGLTFLoad(url) {
  let roughnessMipmapper = new RoughnessMipmapper(renderer);
  gltfLoader = new GLTFLoader(manager);
  gltfLoader.load(url, gltf => onSuccess(gltf));

  roughnessMipmapper.dispose();

  function onSuccess(gltf) {
    gltf.scene.traverse(function(node) {
      if (node.isMesh) {
        node.receiveShadow = true;
        roughnessMipmapper.generateMipmaps(node.material);
      }
    });

    let mesh = gltf.scene.children[0];
    //  dragObj.push(mesh);
    scene.add(mesh);
    objFloor = mesh;
  }
}
