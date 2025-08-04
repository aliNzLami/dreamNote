let scene, camera, renderer, textureLoader;
let pages = [], currentPage = 0;
const pictures = [
  "https://media.craiyon.com/2025-04-15/ycL1jYsqROeJ5tqMWeX1dg.webp", 
  "https://pics.craiyon.com/2023-07-05/60d42465df7745d89c96ef70ebfa4c46.webp",
  "https://media.craiyon.com/2025-04-18/fwwJM-DtTH6yRGLF5iaS9A.webp"
];

const threeD = {
  scene: () => {
    scene = new THREE.Scene();
  },
  camera: () => {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
  },
  renderer: () => {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#141414');
    document.getElementById("3D").appendChild(renderer.domElement);
  },
  light: () => {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);
  },
  init: () => {
    threeD.scene();
    threeD.camera();
    threeD.renderer();
    threeD.light();
  }
}

const wires_shapes = {
  wiresInfo: {
    ringCount: 6, 
    ringSpacing: 0.6, 
    ringRadius: 0.15,  
    tubeRadius: 0.03,
    ringMaterial: new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 }),
  },

  createShapes: () => {
    const info = {...wires_shapes.wiresInfo}
    for (let i = 0; i < info.ringCount; i++) {
      const ringGeometry = new THREE.TorusGeometry(info.ringRadius, info.tubeRadius, 16, 100);
      const ringMesh = new THREE.Mesh(ringGeometry, info.ringMaterial);
  
      ringMesh.position.x = -((info.ringCount - 1) * info.ringSpacing) / 2 + i * info.ringSpacing;
      ringMesh.position.y = 2.6;
      ringMesh.position.z = 0;
      ringMesh.rotation.y = Math.PI / 2;
  
      scene.add(ringMesh);
    }
  }

}

const pages_shapes = {
  textureLoader: () => {
    textureLoader = new THREE.TextureLoader();
  },

  loadTextureAsync: (url) => {
    pages_shapes.textureLoader();
    return new Promise((resolve, reject) => {
      textureLoader.load(
        url,
        (texture) => resolve(texture),
        undefined,
        (err) => reject(err)
      );
    });
  },

  createShapes: async () => {
    for (let [index, url] of pictures.entries()) {
      try {
        const texture = await pages_shapes.loadTextureAsync(url);
        console.log(texture); // Now logs the loaded texture
  
        const geometry = new THREE.PlaneGeometry(4, 5);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const page = new THREE.Mesh(geometry, material);
        page.visible = false;
  
        // Make the first page visible
        if (index === 0) {
          page.visible = true;
        }
  
        scene.add(page);
        pages.push(page);
      } catch (err) {
        console.error('Error loading texture:', err);
      }
    }
  },
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const renderAll = async () => {
  wires_shapes.createShapes();
  await pages_shapes.createShapes();
  console.log(pages);
  
  animate();
}

const onClick_flipping = {

  change_currentPage: () => {
    if(pages.length - 1 === currentPage) {
      currentPage = 0;
    }
    else {
      currentPage = currentPage + 1;
    }
  },

  flipPage: () => {
    gsap.to(pages[currentPage].rotation, {
      x: -1.5,
      duration: 1.5,
      onComplete: () => {
        pages[currentPage].rotation.x = 0;
        pages[currentPage].position.y = 0;
        pages[currentPage].visible = false;
        onClick_flipping.change_currentPage();
        pages[currentPage].visible = true;
      }
    });

    gsap.to(pages[currentPage].position, {
      y: Math.PI * 1.1,
      duration: 1,
      onComplete: () => {
      }
    });
  }
}
  
threeD.init();
renderAll();
[...document.getElementsByTagName('canvas')][0].onclick = onClick_flipping.flipPage;





