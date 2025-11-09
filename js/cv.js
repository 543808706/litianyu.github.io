/**
 * CV Page JavaScript
 * This file handles the functionality for the CV page
 * including skills visualization, project modals, and animations.
 */

$(document).ready(function() {
    // Skill data for visualization
    const skills = [
        { name: "Java", level: 78 },
        { name: "HTML/CSS", level: 90 },
        { name: "JavaScript", level: 75 },
        { name: "C++", level: 70 },
        { name: "Python", level: 85 },
        { name: "SQL", level: 80 }
    ];

    // Project details data - Updated based on PDF resume
    const projectDetails = {
        uno: {
            title: "UNO Card Game Java System",
            description: "A complete Java implementation of the classic UNO card game with object-oriented design patterns.",
            responsibilities: [
                "Designed and implemented card classes and core game logic with 1,500+ lines of code",
                "Applied object-oriented design patterns to enhance code maintainability and scalability",
                "Conducted comprehensive integration and unit testing",
                "Authored technical documentation"
            ],
            technologies: ["Java", "OOP Design Patterns", "JUnit", "Maven"],
            challenges: "The main challenge was implementing the complex UNO rules and special card actions while maintaining clean, maintainable code architecture through object-oriented design principles.",
            achievements: "Successfully delivered a fully functional UNO game system with comprehensive testing coverage and clear technical documentation."
        },
        news: {
            title: "News Management Web System",
            description: "A responsive web-based news management system featuring modern front-end architecture and optimized performance.",
            responsibilities: [
                "Led front-end architecture design using HTML5, CSS3, and JavaScript",
                "Designed UI for homepage and 5 sub-pages, improving page load speed by 20%",
                "Managed visual design and asset collection to ensure aesthetic appeal and user-friendliness",
                "Implemented responsive design for cross-device compatibility"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            challenges: "Balancing aesthetic appeal with performance optimization while ensuring a consistent user experience across all pages and devices.",
            achievements: "Achieved a 20% improvement in page load speed while maintaining high visual quality and user-friendliness across all pages."
        },
        plant: {
            title: "Plant Identification Android System",
            description: "An intelligent Android application that uses image recognition to identify plant species with high accuracy.",
            responsibilities: [
                "Served as product manager, conducting requirements analysis and delivering Product Requirements Document (PRD)",
                "Completed feasibility analysis for 10+ core features, coordinated development resources",
                "Designed plant recognition algorithm integration solution, improving identification accuracy to 85%",
                "Managed project timeline and stakeholder communication"
            ],
            technologies: ["Android", "Product Management", "ML Integration", "API Design"],
            challenges: "Coordinating development resources while ensuring the plant recognition algorithm integration met the 85% accuracy target across diverse plant species.",
            achievements: "Successfully delivered a product with 85% plant identification accuracy and comprehensive feature set through effective product management and technical coordination."
        },
        maze: {
            title: "Maze Game Unity System",
            description: "A 3D maze game built with Unity featuring engaging gameplay mechanics and optimized user experience.",
            responsibilities: [
                "Developed game item system using Unity engine and C# scripting, implementing 5 item types",
                "Created 3D models and animations to optimize gameplay, increasing user retention rate by 40%",
                "Led 2 development iterations, refining game balance and playability based on testing feedback",
                "Implemented player feedback mechanisms and performance optimizations"
            ],
            technologies: ["Unity", "C#", "3D Modeling", "Game Design"],
            challenges: "Creating balanced and engaging gameplay mechanics while optimizing performance across different devices and maintaining high user retention.",
            achievements: "Achieved a 40% increase in user retention rate through iterative development and gameplay optimization based on user testing feedback."
        }
    };

    // Initialize the page
    function initialize() {
        // Load skill bars
        loadSkillBars();
        
        // Setup profile image animation
        setupProfileImage();
        
        // Set up project modal functionality
        setupProjectModals();
        
        // Animate elements on scroll
        setupScrollAnimations();
    }

    // Load skill bars visualization
    function loadSkillBars() {
        const $skillBars = $('#skillBars');
        
        // Create skill bars for each skill
        skills.forEach(skill => {
            const colorClass = getSkillColorClass(skill.level);
            
            const skillBar = `
                <div class="skill-bar">
                    <div class="skill-bar-header">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-level">${skill.level}%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-bar ${colorClass}" style="width: 0%"></div>
                    </div>
                </div>
            `;
            
            $skillBars.append(skillBar);
        });
        
        // Animate skill bars after a short delay
        setTimeout(() => {
            $('.skill-progress-bar').each(function(index) {
                const level = skills[index].level;
                $(this).css('width', `${level}%`);
            });
        }, 500);
    }

    // Get color class based on skill level
    function getSkillColorClass(level) {
        if (level >= 85) return 'bg-success';
        if (level >= 70) return 'bg-info';
        if (level >= 50) return 'bg-warning';
        return 'bg-danger';
    }

    // Set up profile image animations and placeholder
    function setupProfileImage() {
        // Use a placeholder image if no profile image is available
        const $profileImage = $('#profileImage');
        
        // Handle image error by setting a placeholder
        $profileImage.on('error', function() {
            $(this).attr('src', 'https://via.placeholder.com/200x200?text=Tianyu+Li');
        });
        
        // Try to set the image source
        if (!$profileImage.attr('src')) {
            $profileImage.attr('src', 'https://via.placeholder.com/200x200?text=Tianyu+Li');
        }
        
        // Add pulse animation on hover
        $profileImage.parent().hover(
            function() { $profileImage.addClass('pulse'); },
            function() { $profileImage.removeClass('pulse'); }
        );
    }

    // Set up project modal functionality
    function setupProjectModals() {
        $('.project-details-btn').on('click', function() {
            const projectId = $(this).parent().data('project');
            const projectData = projectDetails[projectId];
            
            // Fill modal with project data
            $('#projectModalLabel').text(projectData.title);
            
            const modalContent = `
                <div class="project-modal-content">
                    <p class="project-description"><strong>${projectData.description}</strong></p>
                    
                    <h4>Key Responsibilities</h4>
                    <ul class="project-responsibilities">
                        ${projectData.responsibilities.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    
                    <h4>Technologies Used</h4>
                    <div class="project-technologies mb-3">
                        ${projectData.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                    </div>
                    
                    <h4>Challenges & Solutions</h4>
                    <p>${projectData.challenges}</p>
                    
                    <h4>Key Achievements</h4>
                    <p>${projectData.achievements}</p>
                </div>
            `;
            
            $('#projectModalBody').html(modalContent);
            
            // Show the modal
            const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
            projectModal.show();
        });
    }

    // Set up animations for elements when they scroll into view
    function setupScrollAnimations() {
        // Add fade-in class to sections as they scroll into view
        $(window).on('scroll', function() {
            $('.cv-section').each(function() {
                const sectionTop = $(this).offset().top;
                const scrollPosition = $(window).scrollTop() + $(window).height() * 0.8;
                
                if (scrollPosition > sectionTop && !$(this).hasClass('fade-in')) {
                    $(this).addClass('fade-in');
                }
            });
        });
        
        // Trigger scroll event once to check initial visible elements
        $(window).trigger('scroll');
    }

    // Initialize the page
    initialize();
});