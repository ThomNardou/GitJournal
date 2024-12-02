
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('tokenButton');
    const text = document.getElementById('tokenText');

    btn.addEventListener('click', () => {
        const res = window.ipcRenderer.invoke("get-token");

        text.innerText = res;

        console.log(res);
    });
})