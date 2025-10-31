// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('introForm');
    const generateHtmlBtn = document.getElementById('generateHtmlBtn');
    const formContainer = document.getElementById('form-container');
    const htmlContainer = document.getElementById('html-container');
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

    // Generate HTML button functionality
    if (generateHtmlBtn) {
        generateHtmlBtn.addEventListener('click', function(e) {
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

            // Generate the HTML
            generateHTML();
        });
    }

    // Function to generate HTML from form data
    function generateHTML() {
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

        // Build full name
        let fullName = firstName;
        if (middleName) {
            fullName += ' ' + middleName;
        }
        if (nickname) {
            fullName += ' "' + nickname + '"';
        }
        fullName += ' ' + lastName;

        // Generate HTML string matching introduction.html format
        let htmlString = '<h2>Introduction HTML</h2>\n';
        htmlString += '<h2>' + fullName + ' || ' + mascotAdjective + ' ' + mascotAnimal + '</h2>\n';
        htmlString += '<figure>\n';
        htmlString += '    <img src="' + uploadedImageData + '" alt="' + pictureCaption + '">\n';
        htmlString += '    <figcaption>' + pictureCaption + '</figcaption>\n';
        htmlString += '</figure>\n';
        htmlString += '<ul>\n';
        htmlString += '    <li><b>Personal Background</b>: ' + personalBg + '</li>\n';
        htmlString += '    <li><b>Academic Background</b>: ' + academicBg + '</li>\n';
        htmlString += '    <li><b>Background in the Subject</b>: ' + subjectBg + '</li>\n';
        htmlString += '    <li><b>Primary Platform/Computer</b>: ' + platform + '</li>\n';

        // Add courses section if there are any courses
        if (courses.length > 0) {
            htmlString += '    <li><b>Courses I\'m Taking, & Why</b>:\n';
            htmlString += '        <ul>\n';
            
            courses.forEach(function(course) {
                htmlString += '            <li><b>' + course.department + ' ' + course.number + '</b> - ' + course.name + ': ' + course.reason + '</li>\n';
            });
            
            htmlString += '        </ul>\n';
            htmlString += '    </li>\n';
        }

        // Close the main ul and add funny item
        htmlString += '    <li><b>Funny/Interesting Item</b>: ' + funnyItem + '</li>\n';
        htmlString += '</ul>';

        // Display the HTML
        displayHTML(htmlString);
    }

    // Function to display HTML with syntax highlighting
    function displayHTML(htmlString) {
        let displayContent = '';
        displayContent += '<h2>Introduction HTML</h2>';
        displayContent += '<section>';
        displayContent += '<pre><code class="language-html">';
        displayContent += escapeHtml(htmlString);
        displayContent += '</code></pre>';
        displayContent += '</section>';
        displayContent += '<button type="button" id="resetHtmlResult">Reset Form</button>';

        // Display result
        htmlContainer.innerHTML = displayContent;
        
        // Hide form, show HTML
        formContainer.style.display = 'none';
        htmlContainer.style.display = 'block';

        // Apply syntax highlighting if highlight.js is available
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }

        // Add reset functionality
        document.getElementById('resetHtmlResult').addEventListener('click', function() {
            formContainer.style.display = 'block';
            htmlContainer.style.display = 'none';
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