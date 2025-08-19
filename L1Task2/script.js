  const form = document.getElementById("contactForm");

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Clear errors
        document
          .querySelectorAll(".error")
          .forEach((el) => (el.textContent = ""));

        let valid = true;

        // Full Name
        const fullname = document.getElementById("fullname").value.trim();
        if (fullname === "") {
          document.getElementById("nameError").textContent =
            "Full name is required.";
          valid = false;
        }

        // Email
        const email = document.getElementById("email").value.trim();
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (email === "") {
          document.getElementById("emailError").textContent =
            "Email is required.";
          valid = false;
        } else if (!emailPattern.test(email)) {
          document.getElementById("emailError").textContent =
            "Enter a valid email.";
          valid = false;
        }

        // Subject
        const subject = document.getElementById("subject").value.trim();
        if (subject === "") {
          document.getElementById("subjectError").textContent =
            "Subject is required.";
          valid = false;
        }

        // Message
        const message = document.getElementById("message").value.trim();
        if (message === "") {
          document.getElementById("messageError").textContent =
            "Message is required.";
          valid = false;
        }

        if (valid) {
          alert("Form submitted successfully!");
          form.reset();
        }
      });