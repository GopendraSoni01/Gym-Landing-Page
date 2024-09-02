document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, password, paymentMethod })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Registration Successful!');
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Error during registration');
    }
});
