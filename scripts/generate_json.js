// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('introForm');
    const generateJsonBtn = document.getElementById('generateJsonBtn');
    const formContainer = document.getElementById('form-container');
    const jsonContainer = document.getElementById('json-container');
    const coursesContainer = document.getElementById('courses-container');

    // Variable to store uploaded image data
    let uploadedImageData = null;

    // Handle file upload
    const pictureFileInput = document.getElementById('pictureFile');
    if (pictureFileInput) {
        pictureFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    uploadedImageData = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Generate JSON button functionality
    if (generateJsonBtn) {
        generateJsonBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate required fields
            if (!formElement.checkValidity()) {
                formElement.reportValidity();
                return;
            }

            // Check if image file is uploaded
            if (!uploadedImageData) {
                alert('Please upload an image file.');
                return;
            }

            // Generate the JSON
            generateJSON();
        });
    }

    // Function to generate JSON from form data
    function generateJSON() {
        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const middleName = document.getElementById('middleName').value.trim();
        const nickname = document.getElementById('nickname').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const mascotAdjective = document.getElementById('mascotAdjective').value.trim();
        const mascotAnimal = document.getElementById('mascotAnimal').value.trim();
        const pictureCaption = document.getElementById('pictureCaption').value.trim();
        
        // Get background information
        const personalBg = document.getElementById('personalBg').value.trim();
        const academicBg = document.getElementById('academicBg').value.trim();
        const subjectBg = document.getElementById('subjectBg').value.trim();
        const platform = document.getElementById('platform').value.trim();
        const funnyItem = document.getElementById('funnyItem').value.trim();

        // Get courses
        const courseEntries = coursesContainer.querySelectorAll('.course-entry');
        const courses = [];
        courseEntries.forEach(function(entry) {
            const dept = entry.querySelector('.courseDept').value.trim();
            const num = entry.querySelector('.courseNum').value.trim();
            const name = entry.querySelector('.courseName').value.trim();
            const reason = entry.querySelector('.courseReason').value.trim();
            if (dept && num && name && reason) {
                courses.push({
                    department: dept,
                    number: num,
                    name: name,
                    reason: reason
                });
            }
        });

        // Create JSON object matching the required format
        const jsonData = {
            firstName: firstName,
            preferredName: nickname || "",
            middleInitial: middleName || "",
            lastName: lastName,
            divider: "||",
            mascotAdjective: mascotAdjective,
            mascotAnimal: mascotAnimal,
            image: uploadedImageData,
            imageCaption: pictureCaption,
            personalStatement: "",
            personalBackground: personalBg,
            professionalBackground: "",
            academicBackground: academicBg,
            subjectBackground: subjectBg,
            primaryComputer: platform,
            courses: courses,
            funnyItem: funnyItem
        };

        // Convert to formatted JSON string
        const jsonString = JSON.stringify(jsonData, null, 2);

        // Display the JSON
        displayJSON(jsonString);
    }

    // Function to display JSON with syntax highlighting
    function displayJSON(jsonString) {
        let htmlContent = '';
        htmlContent += '<h2>Introduction JSON</h2>';
        htmlContent += '<section>';
        htmlContent += '<pre><code class="language-json">';
        htmlContent += escapeHtml(jsonString);
        htmlContent += '</code></pre>';
        htmlContent += '</section>';
        htmlContent += '<button type="button" id="resetJsonResult">Reset Form</button>';

        // Display result
        jsonContainer.innerHTML = htmlContent;
        
        // Hide form, show JSON
        formContainer.style.display = 'none';
        jsonContainer.style.display = 'block';

        // Apply syntax highlighting if highlight.js is available
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }

        // Add reset functionality
        document.getElementById('resetJsonResult').addEventListener('click', function() {
            formContainer.style.display = 'block';
            jsonContainer.style.display = 'none';
            formElement.reset();
            uploadedImageData = null;
            window.scrollTo(0, 0);
        });

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Helper function to escape HTML
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
});