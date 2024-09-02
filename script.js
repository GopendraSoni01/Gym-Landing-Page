// Toggle mobile menu
document.querySelector(".mobile-btn").addEventListener("click", function () {
  document.querySelector(".menu").classList.toggle("active");
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;

  if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
  }

  try {
      // Register the user and get payment details
      const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, password, paymentMethod })
      });

      const result = await response.json();

      if (response.ok) {
          var options = {
              "key": "YOUR_RAZORPAY_KEY_ID", // Enter the Key ID generated from the Dashboard
              "amount": result.amount, // Amount in paise (e.g., 50000 paise = 500 INR)
              "currency": result.currency,
              "name": "PGC-GYM",
              "description": "Membership Registration",
              "order_id": result.id, // Pass the `id` obtained in the response from the backend
              "handler": function (response) {
                  // Handle successful payment here
                  alert('Payment Successful!');
                  console.log(response);
                  // Optionally, send the payment details to your server for verification and further processing
                  fetch('http://localhost:5000/api/users/payment/success', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(response)
                  }).then(res => res.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Error:', error));
              },
              "prefill": {
                  "name": name,
                  "email": email,
                  "contact": phone
              },
              "theme": {
                  "color": "#3399cc"
              }
          };

          var rzp1 = new Razorpay(options);
          rzp1.open();
      } else {
          alert(result.message);
      }
  } catch (error) {
      alert('Error during registration or payment process.');
      console.error(error);
  }
});
