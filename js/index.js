/**
 * 中文简历页面 JavaScript
 * 处理中文简历页面的功能
 * 包括技能可视化、项目模态框和动画
 */

$(document).ready(function() {
    // 技能数据
    const skills = [
        { name: "Java", level: 78 },
        { name: "HTML/CSS", level: 90 },
        { name: "JavaScript", level: 75 },
        { name: "C++", level: 70 },
        { name: "Python", level: 85 },
        { name: "SQL", level: 80 }
    ];

    // 项目详情数据（中文版）- 根据PDF简历更新
    const projectDetails = {
        uno: {
            title: "UNO卡牌游戏Java系统",
            description: "采用面向对象设计模式的完整Java UNO卡牌游戏实现。",
            responsibilities: [
                "设计并实现卡牌类及核心游戏逻辑，代码量达1500+行",
                "采用面向对象设计模式，提高代码可维护性和可扩展性",
                "完成系统集成测试和单元测试",
                "编写技术文档"
            ],
            technologies: ["Java", "面向对象设计模式", "JUnit", "Maven"],
            challenges: "主要挑战是在保持代码架构清晰、可维护的同时，通过面向对象设计原则实现复杂的UNO规则和特殊卡牌动作。",
            achievements: "成功交付了功能完整的UNO游戏系统，具有全面的测试覆盖率和清晰的技术文档。"
        },
        news: {
            title: "新闻管理页面HTML系统",
            description: "一个具有现代前端架构和优化性能的响应式新闻管理系统。",
            responsibilities: [
                "负责前端架构设计，使用HTML5、CSS3、JavaScript",
                "主导5个页面的UI设计，页面加载速度提升20%",
                "进行素材收集与视觉设计，确保用户友好性和美观性",
                "实现跨设备响应式设计"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "响应式设计"],
            challenges: "在确保所有页面和设备上一致用户体验的同时，平衡美观性与性能优化。",
            achievements: "在保持高视觉质量和用户友好性的同时，实现了20%的页面加载速度提升。"
        },
        plant: {
            title: "植物识别Android系统",
            description: "一个使用图像识别技术高精度识别植物物种的智能Android应用。",
            responsibilities: [
                "担任产品经理，进行需求分析和功能设计，输出产品需求文档（PRD）",
                "完成10+个核心功能的可行性分析，协调开发资源",
                "设计植物识别算法集成方案，识别准确率达85%",
                "管理项目时间线和利益相关方沟通"
            ],
            technologies: ["Android", "产品管理", "机器学习集成", "API设计"],
            challenges: "在协调开发资源的同时，确保植物识别算法集成在多种植物物种上达到85%的准确率目标。",
            achievements: "通过有效的产品管理和技术协调，成功交付了具有85%植物识别准确率和全面功能集的产品。"
        },
        maze: {
            title: "迷宫游戏Unity系统",
            description: "使用Unity构建的3D迷宫游戏，具有引人入胜的游戏机制和优化的用户体验。",
            responsibilities: [
                "使用Unity引擎和C#脚本开发游戏道具系统，实现5种道具类型",
                "进行3D建模和动画设计以优化游戏玩法，用户留存率提升40%",
                "主导2次开发迭代，基于测试反馈改进游戏平衡性和可玩性",
                "实现玩家反馈机制和性能优化"
            ],
            technologies: ["Unity", "C#", "3D建模", "游戏设计"],
            challenges: "在优化不同设备性能并保持高用户留存率的同时，创建平衡且引人入胜的游戏机制。",
            achievements: "通过基于用户测试反馈的迭代开发和游戏玩法优化，实现了用户留存率提升40%。"
        }
    };

    // 初始化页面
    function initialize() {
        // 加载技能条
        loadSkillBars();
        
        // 设置个人照片动画
        setupProfileImage();
        
        // 设置项目模态框功能
        setupProjectModals();
        
        // 滚动时动画元素
        setupScrollAnimations();
    }

    // 加载技能条可视化
    function loadSkillBars() {
        const $skillBars = $('#skillBarsCn');
        
        // 为每个技能创建技能条
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
        
        // 短暂延迟后动画技能条
        setTimeout(() => {
            $('.skill-progress-bar').each(function(index) {
                const level = skills[index].level;
                $(this).css('width', `${level}%`);
            });
        }, 500);
    }

    // 根据技能水平获取颜色类
    function getSkillColorClass(level) {
        if (level >= 85) return 'bg-success';
        if (level >= 70) return 'bg-info';
        if (level >= 50) return 'bg-warning';
        return 'bg-danger';
    }

    // 设置个人照片动画和占位符
    function setupProfileImage() {
        // 如果没有个人照片，使用占位符图像
        const $profileImage = $('#profileImageCn');
        
        // 处理图像错误，设置占位符
        $profileImage.on('error', function() {
            $(this).attr('src', 'https://via.placeholder.com/200x200?text=李天宇');
        });
        
        // 尝试设置图像源
        if (!$profileImage.attr('src')) {
            $profileImage.attr('src', 'https://via.placeholder.com/200x200?text=李天宇');
        }
        
        // 悬停时添加脉冲动画
        $profileImage.parent().hover(
            function() { $profileImage.addClass('pulse'); },
            function() { $profileImage.removeClass('pulse'); }
        );
    }

    // 设置项目模态框功能
    function setupProjectModals() {
        $('.project-details-btn').on('click', function() {
            const projectId = $(this).parent().data('project');
            const projectData = projectDetails[projectId];
            
            // 用项目数据填充模态框
            $('#projectModalLabelCn').text(projectData.title);
            
            const modalContent = `
                <div class="project-modal-content">
                    <p class="project-description"><strong>${projectData.description}</strong></p>
                    
                    <h4>主要职责</h4>
                    <ul class="project-responsibilities">
                        ${projectData.responsibilities.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    
                    <h4>使用技术</h4>
                    <div class="project-technologies mb-3">
                        ${projectData.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                    </div>
                    
                    <h4>挑战与解决方案</h4>
                    <p>${projectData.challenges}</p>
                    
                    <h4>关键成就</h4>
                    <p>${projectData.achievements}</p>
                </div>
            `;
            
            $('#projectModalBodyCn').html(modalContent);
            
            // 显示模态框
            const projectModal = new bootstrap.Modal(document.getElementById('projectModalCn'));
            projectModal.show();
        });
    }

    // 当元素滚动到视图中时设置动画
    function setupScrollAnimations() {
        // 当sections滚动到视图中时添加淡入类
        $(window).on('scroll', function() {
            $('.cv-section').each(function() {
                const sectionTop = $(this).offset().top;
                const scrollPosition = $(window).scrollTop() + $(window).height() * 0.8;
                
                if (scrollPosition > sectionTop && !$(this).hasClass('fade-in')) {
                    $(this).addClass('fade-in');
                }
            });
        });
        
        // 触发一次滚动事件以检查初始可见元素
        $(window).trigger('scroll');
    }

    // 初始化页面
    initialize();
});