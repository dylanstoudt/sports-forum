// const logout = async () => {
//   const response = await fetch('/api/users/logout', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (response.ok) {
//     document.location.replace('/');
//   } else {
//     alert(response.statusText);
//   }
// };
// console.log('Before event listener registration');
// document.querySelector('#logout').addEventListener('click', logout);
// public/js/logout.js
const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to a desired page after logout (e.g., homepage)
      window.location.replace('/');
    } else {
      alert('Logout failed. Please try again.');
    }
  } catch (err) {
    console.error('Logout failed:', err);
  }
};

// Add an event listener to the logout button
document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }
});

