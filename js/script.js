const header_logo = document.querySelector('.header_logo');
const header_link_group = document.querySelector('.header_link_group');
const tabs_selections = document.querySelectorAll('.tabs_selection');
const features_descriptions = document.querySelectorAll('.feature_description');
const emailInput = document.querySelector('#email');
const toast = document.querySelector('.toast');
let timeout;

function addGlobalListener(event, selector, cb) {
  document.addEventListener(event, (e) => {
    if (e.target.matches(selector)) cb(e);
  });
}
function handleFeaturesClick(e) {
  const feature_selected = e.target.closest('.tabs_selection');
  const descriptionIndex = feature_selected.dataset.index;
  if (!feature_selected) return;
  tabs_selections.forEach((tab) => {
    tab.dataset.selected = false;
  });
  feature_selected.dataset.selected = true;
  features_descriptions.forEach((description) => {
    description.classList.add('hide');
  });
  document
    .querySelector(`.description${descriptionIndex}`)
    .classList.remove('hide');
}
function handleEmailSubmitSuccess() {
  if (toast.classList.contains('show')) {
    clearTimeout(timeout);
  }
  toast.classList.add('show');
  timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
function handleEmailInput(e) {
  e.preventDefault();
  const regex = /^(\w+@\w+\.\w+)$/g;
  if (!regex.test(`${emailInput.value}`)) {
    emailInput.dataset.valid = false;
    return;
  }
  emailInput.dataset.valid = true;
  emailInput.value = '';
  handleEmailSubmitSuccess();
}

addGlobalListener('submit', '.cta_form', handleEmailInput);
addGlobalListener('click', '.header_hamburger--img', () => {
  header_logo.classList.toggle('mobile');
  header_link_group.classList.toggle('mobile');
  document.body.classList.toggle('no-scroll');
});

document
  .querySelector('.features_tabs')
  .addEventListener('click', handleFeaturesClick);
