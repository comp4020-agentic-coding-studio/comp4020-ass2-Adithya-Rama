type RunningScene = { dispose(): void };
let active: RunningScene | undefined; let queue:Promise<void>=Promise.resolve();
export function registerAcademyScenes() {
  document.querySelectorAll<HTMLElement>('[data-academy-world]').forEach(root => {
    if (root.dataset.registered) return;
    root.dataset.registered = 'true';
    const launch = root.querySelector<HTMLButtonElement>('[data-world-launch]')!;
    const loading = root.querySelector<HTMLElement>('[data-world-loading]')!;
    launch.addEventListener('click', async () => {
      launch.disabled = true;root.querySelectorAll('.world-error').forEach(message=>message.remove());
      loading.hidden = false;
      const previous=queue;let release!:()=>void;queue=new Promise<void>(resolve=>{release=resolve});await previous;let world: RunningScene | undefined; try {
        const { AcademyWorld } = await import('./world');
        active?.dispose();
        const instance = new AcademyWorld(root); world = instance;
        await instance.start();
        active = instance;
      } catch (error) { world?.dispose();
        launch.disabled = false;
        launch.textContent = 'Try opening the 3D environment again';
        const message = document.createElement('p');
        message.className = 'world-error';
        message.setAttribute('role', 'status');
        message.textContent = (root.dataset.mode==='demo'?'The 3D example could not open on this device. The complete transcript, finished example and learning controls remain available below. ':'The 3D room could not open on this device. The complete interactive lab remains available below. ') + (error instanceof Error ? error.message : 'Please try the lightweight graphics setting.');
        root.querySelector('.world-poster-copy')?.append(message);
      } finally { loading.hidden = true; release(); }
    });
  });
}
