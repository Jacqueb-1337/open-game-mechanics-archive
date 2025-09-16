import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

let scene, camera, renderer;
let player, enemy, ground;
let velocityY = 0;
const GRAVITY = -30;
const MOVE_SPEED = 5;
const JUMP_SPEED = 10;
let canJump = false;
const clock = new THREE.Clock();
const keys = {};
let resetCooldown = false;

console.log("test");
function resetGame() {
  if (resetCooldown) return;
  resetCooldown = true;
  setTimeout(() => resetCooldown = false, 500); // Prevent rapid resets

  // Reset player
  player.position.set(0, 1, 0);
  velocityY = 0;
  canJump = false;

  // Reset or recreate enemy
  if (enemy) {
    scene.remove(enemy);
  }
  const enemyGeo = new THREE.BoxGeometry(1, 1, 1);
  const enemyMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  enemy = new THREE.Mesh(enemyGeo, enemyMat);
  enemy.position.set(3, 1, 0);
  scene.add(enemy);

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

  // Enemy
  const enemyGeo = new THREE.BoxGeometry(1, 1, 1);
  const enemyMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  enemy = new THREE.Mesh(enemyGeo, enemyMat);
  enemy.position.set(3, 1, 0);
  scene.add(enemy);

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
  if (keys['ArrowLeft'] || keys['KeyA']) moveX -= MOVE_SPEED * delta;
  if (keys['ArrowRight'] || keys['KeyD']) moveX += MOVE_SPEED * delta;
  player.position.x += moveX;

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

  // Enemy collision detection
  if (enemy) {
    const playerBB = new THREE.Box3().setFromObject(player);
    const enemyBB = new THREE.Box3().setFromObject(enemy);
    if (playerBB.intersectsBox(enemyBB)) {
      console.log('Collision detected!');
      const playerBottom = playerBB.min.y;
      const enemyTop = enemyBB.max.y;
      console.log(`Player bottom: ${playerBottom}, Enemy top: ${enemyTop}, VelocityY: ${velocityY}`);
      // Stomp: player is moving down, and player's bottom is above enemy's top
      if (velocityY < 0 && playerBottom >= enemyTop - 0.1) {
        console.log('Stomp!');
        scene.remove(enemy);
        enemy = null;
        velocityY = JUMP_SPEED * 0.5; // bounce
        canJump = false;
      } else {
        // Block horizontal movement if colliding from the side
        const dx = Math.abs(player.position.x - enemy.position.x);
        if (dx < 1.0) { // if close in x, block horizontal movement
          console.log('Blocking horizontal movement');
          player.position.x -= moveX;
        }
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(0.05, clock.getDelta());
  update(delta);
  renderer.render(scene, camera);
}

init();
animate();
