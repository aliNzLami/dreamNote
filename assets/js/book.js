let scene, camera, renderer, textureLoader;
let pages = [], currentPage = 0;
const pictures = [
  "https://i.postimg.cc/SRDL44Yv/1000014341.webp", 
  "https://i.postimg.cc/593SLBKS/1000014343.webp",
  "https://i.postimg.cc/ZK5FcW1t/1000014344.webp",
  "https://i.postimg.cc/fTq7gwN3/1000014345.webp",
  "https://i.postimg.cc/8zFR2qpZ/1000014346.webp",
  "https://i.postimg.cc/NjW6BpLB/1000014347.webp",
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
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);
  },
  responsive: () => {
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjecttionMatrix();
    })
  },
  init: () => {
    threeD.scene();
    threeD.camera();
    threeD.renderer();
    threeD.light();
    threeD.responsive()
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
  
        const geometry = new THREE.PlaneGeometry(4, 5);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const page = new THREE.Mesh(geometry, material);
        scene.add(page);
        pages.push(page);
        currentPage = pages.length - 1;
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
  animate();
}

const onClick_flipping = {

  startOver: () => {
    currentPage = pages.length - 1;
    for(page of pages) {
      page.visible = true;
    }
  },

  change_currentPage: () => {
    currentPage = currentPage - 1;
    if(currentPage === -1) {
      onClick_flipping.startOver();
    }
  },

  flipPage: () => {
    gsap.to(pages[currentPage].rotation, {
      x: -1,
      duration: 1,
      onComplete: () => {
        pages[currentPage].rotation.x = 0;
        pages[currentPage].position.y = 0;
        pages[currentPage].position.z = 0;
        pages[currentPage].visible = false;
        onClick_flipping.change_currentPage();
      }
    });

    gsap.to(pages[currentPage].position, {
      y: Math.PI / 1.9,
      z: 1.3,
      duration: 0.5,
      onComplete: () => {
      }
    });
  }
}
  
threeD.init();
renderAll();
[...document.getElementsByTagName('canvas')][0].onclick = onClick_flipping.flipPage;





