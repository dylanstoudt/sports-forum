const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // Redirect to a desired page after logout (e.g., homepage)
      window.location.replace('/login');
    } else {
      alert('Logout failed. Please try again.');
    }
  } catch (err) {
    console.error('Logout failed:', err);
  }
};

// Add an event listener to the logout button
// document.addEventListener('DOMContentLoaded', () => {
//   const logoutButton = document.getElementById('logout');
//   if (logoutButton) {
//     logoutButton.addEventListener('click', logout);
//   }
// });

document.querySelector("#logout").addEventListener("click", logout)
