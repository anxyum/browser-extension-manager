const $extensions = document.querySelector(".extensions");
const $filters = document.querySelectorAll(".filter");

let extensions;

function createExtensionCard(extension) {
  const $extensionWrapper = document.createElement("div");
  $extensionWrapper.innerHTML = `<li class="extension-wrapper">
  <div class="extension-infos">
    <img
      class="extension-logo"
      src="${extension.logo}"
      alt=""
    />
    <div class="extension-text-infos">
      <p class="extension-name">${extension.name}</p>
      <p class="extension-description">${extension.description}</p>
    </div>
  </div>
  <div class="action-buttons">
    <button class="extension-remove-btn">Remove</button>
    <label class="toggle-switch">
      <span></span>
      <input type="checkbox" ${extension.isActive ? "checked" : ""} />
    </label>
  </div>
</li>`;
  const $extension = $extensionWrapper.querySelector("*");

  $extension
    .querySelector(".extension-remove-btn")
    .addEventListener("click", () => {
      removeExtension(extension);
      $extension.remove();
    });

  $extension
    .querySelector(".toggle-switch input")
    .addEventListener("input", (e) => {
      extension.isActive = e.target.checked;
    });
  extension.card = $extension;
}

function createExtensionsCard(extensions) {
  extensions.forEach((extension) => {
    createExtensionCard(extension);
  });
}

function removeExtension(extension) {
  extensions = extensions.filter((ext) => ext.name != extension.name);
}

function displayExtension(extension) {
  $extensions.appendChild(extension.card);
}

function displayExtensions(extensions) {
  $extensions.innerHTML = "";
  extensions.forEach((extension) => {
    displayExtension(extension);
  });
}

async function setup() {
  const res = await fetch("./data.json");
  extensions = await res.json();
  createExtensionsCard(extensions);
  displayExtensions(extensions);
}

setup();

$filters.forEach(($filter) => {
  $filter.addEventListener("input", (e) => {
    if (!e.target.checked) return;
    if (e.target.value === "all") displayExtensions(extensions);
    if (e.target.value === "active")
      displayExtensions(extensions.filter((extension) => extension.isActive));
    if (e.target.value === "inactive")
      displayExtensions(extensions.filter((extension) => !extension.isActive));
  });
});
