const loginForm = document.getElementById('login');
const header = document.getElementById('header');

function getInputValues(formSubmitEvent) {
  const inputs = Array.from(formSubmitEvent.target.querySelectorAll('input'));
  return inputs.reduce((acc, el) => {
    return { ...acc, [el.name]: el.value };
  }, {});
}

loginForm.addEventListener('submit', async (evt) => {
  try {
    evt.preventDefault();
    const formDataJSON = JSON.stringify(getInputValues(evt));
    const response = await fetch('/login', {
      body: formDataJSON,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const user = await response.json();
    header.innerText = `Hello ${user.email}`;
    loginForm.reset();
  } catch (err) {
    console.error(err);
  }
});
