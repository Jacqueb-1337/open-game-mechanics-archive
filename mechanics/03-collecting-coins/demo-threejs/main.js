import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

let scene, camera, renderer;
let player, ground;
let coins = [];
let score = 0;
let velocityY = 0;
const GRAVITY = -30;
const MOVE_SPEED = 5;
const JUMP_SPEED = 10;
let canJump = false;
const clock = new THREE.Clock();
const keys = {};
let resetCooldown = false;
function resetGame() {
  if (resetCooldown) return;
  resetCooldown = true;
  setTimeout(() => resetCooldown = false, 500); // Prevent rapid resets

  // Reset player
  player.position.set(0, 1, 0);
  velocityY = 0;
  canJump = false;

  // Reset score
  score = 0;
  document.getElementById('score').textContent = 'Score: 0';

  // Remove existing coins
  coins.forEach(coin => scene.remove(coin));
  coins = [];

  // Create new coins
  for (let i = 0; i < 5; i++) {
    const coinGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const coinMat = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    const coin = new THREE.Mesh(coinGeo, coinMat);
    coin.position.set(Math.random() * 10 - 5, 1, Math.random() * 10 - 5);
    scene.add(coin);
    coins.push(coin);
  }

  // Clear keys
  for (let key in keys) {
    keys[key] = false;
  }
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 1, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  // Ground
  const groundGeo = new THREE.PlaneGeometry(20, 20);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x228822 });
  ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  scene.add(ground);

  // Player
  const playerGeo = new THREE.BoxGeometry(1, 1, 1);
  const playerMat = new THREE.MeshStandardMaterial({ color: 0x0077ff });
  player = new THREE.Mesh(playerGeo, playerMat);
  player.position.set(0, 1, 0);
  scene.add(player);

  // Create coins
  for (let i = 0; i < 5; i++) {
    const coinGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const coinMat = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    const coin = new THREE.Mesh(coinGeo, coinMat);
    coin.position.set(Math.random() * 10 - 5, 1, Math.random() * 10 - 5);
    scene.add(coin);
    coins.push(coin);
  }

  window.addEventListener('resize', onResize);
  document.addEventListener('keydown', (e) => { keys[e.code] = true; });
  document.addEventListener('keyup', (e) => { keys[e.code] = false; });

  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', () => {
    resetGame();
    resetButton.blur();
  });
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function update(delta) {
  // Horizontal movement
  let moveX = 0;
  let moveZ = 0;
  if (keys['ArrowLeft'] || keys['KeyA']) moveX -= MOVE_SPEED * delta;
  if (keys['ArrowRight'] || keys['KeyD']) moveX += MOVE_SPEED * delta;
  if (keys['ArrowUp'] || keys['KeyW']) moveZ -= MOVE_SPEED * delta;
  if (keys['ArrowDown'] || keys['KeyS']) moveZ += MOVE_SPEED * delta;
  player.position.x += moveX;
  player.position.z += moveZ;

  // Update camera to follow player
  camera.position.x = player.position.x;
  camera.position.z = player.position.z + 10;
  camera.lookAt(player.position);

  // Jumping
  if ((keys['Space'] || keys['KeyW'] || keys['ArrowUp']) && canJump) {
    velocityY = JUMP_SPEED;
    canJump = false;
  }

  // Apply gravity
  velocityY += GRAVITY * delta;
  player.position.y += velocityY * delta;

  // Ground collision
  if (player.position.y <= 1) {
    player.position.y = 1;
    velocityY = 0;
    canJump = true;
  }

  // Coin collision detection
  coins.forEach((coin, index) => {
    const playerBB = new THREE.Box3().setFromObject(player);
    const coinBB = new THREE.Box3().setFromObject(coin);
    if (playerBB.intersectsBox(coinBB)) {
      scene.remove(coin);
      coins.splice(index, 1);
      score++;
      document.getElementById('score').textContent = `Score: ${score}`;
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(0.05, clock.getDelta());
  update(delta);
  renderer.render(scene, camera);
}

init();
animate();
