/**
 * OpenClaw 中文指南 - 交互脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 导航平滑滚动
    initSmoothScroll();
    
    // 头部滚动效果
    initHeaderScroll();
    
    // 激活当前导航链接
    initActiveNav();
    
    // 代码块复制功能
    initCodeCopy();
    
    // 移动端菜单
    initMobileMenu();
});

/**
 * 导航平滑滚动
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 头部滚动效果
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

/**
 * 激活当前导航链接
 */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 代码块复制功能
 */
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(pre => {
        // 创建复制按钮
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '&#x2398;'; // 复制图标
        button.title = '复制代码';
        
        // 包装 pre 元素
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(button);
        
        // 点击复制事件
        button.addEventListener('click', async function() {
            const code = pre.querySelector('code');
            const text = code ? code.textContent : pre.textContent;
            
            try {
                await navigator.clipboard.writeText(text);
                
                // 显示成功状态
                button.innerHTML = '&#x2713;'; // 对勾图标
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.innerHTML = '&#x2398;';
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('复制失败:', err);
            }
        });
    });
}

/**
 * 移动端菜单
 */
function initMobileMenu() {
    const nav = document.querySelector('.nav');
    const headerContent = document.querySelector('.header-content');
    
    // 仅在移动端创建汉堡菜单按钮
    const mobileBreakpoint = 768;
    
    function createMobileMenu() {
        // 检查是否已存在按钮
        if (document.querySelector('.menu-toggle')) return;
        
        // 检查是否在移动端
        if (window.innerWidth > mobileBreakpoint) return;
        
        // 创建移动端汉堡菜单按钮
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-toggle';
        menuButton.setAttribute('aria-label', '打开菜单');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.innerHTML = '<span></span><span></span><span></span>';
        
        headerContent.appendChild(menuButton);
        
        // 菜单切换功能
        menuButton.addEventListener('click', function() {
            const isActive = nav.classList.toggle('active');
            menuButton.classList.toggle('active');
            menuButton.setAttribute('aria-expanded', isActive);
            menuButton.setAttribute('aria-label', isActive ? '关闭菜单' : '打开菜单');
        });
        
        // 点击导航链接后关闭菜单
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= mobileBreakpoint) {
                    nav.classList.remove('active');
                    menuButton.classList.remove('active');
                    menuButton.setAttribute('aria-expanded', 'false');
                    menuButton.setAttribute('aria-label', '打开菜单');
                }
            });
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= mobileBreakpoint) {
                if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
                    nav.classList.remove('active');
                    menuButton.classList.remove('active');
                    menuButton.setAttribute('aria-expanded', 'false');
                    menuButton.setAttribute('aria-label', '打开菜单');
                }
            }
        });
    }
    
    function removeMobileMenu() {
        const menuButton = document.querySelector('.menu-toggle');
        if (menuButton && window.innerWidth > mobileBreakpoint) {
            menuButton.remove();
            nav.classList.remove('active');
        }
    }
    
    // 初始化时检查
    createMobileMenu();
    
    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        if (window.innerWidth <= mobileBreakpoint) {
            createMobileMenu();
        } else {
            removeMobileMenu();
        }
    });
}

/**
 * 搜索功能（预留）
 */
function initSearch() {
    // 可以扩展搜索功能
}

/**
 * 主题切换（预留）
 */
function initThemeToggle() {
    // 可以添加主题切换功能
}

// 导出函数供控制台使用
window.openclawGuide = {
    version: '1.0.0',
    author: 'OpenClaw 社区'
};
