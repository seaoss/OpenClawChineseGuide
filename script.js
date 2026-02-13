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
    const header = document.querySelector('.header');
    
    // 创建移动端菜单按钮
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '&#9776;'; // 汉堡菜单图标
    menuButton.setAttribute('aria-label', '菜单');
    
    // 添加移动端样式
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-primary);
            padding: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-button {
                display: block;
            }
            
            .nav {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                border-bottom: 1px solid var(--border-color);
                box-shadow: var(--shadow-md);
            }
            
            .nav.active {
                display: flex;
            }
            
            .nav a {
                padding: 0.75rem 0;
                border-bottom: 1px solid var(--border-color);
            }
            
            .nav a:last-child {
                border-bottom: none;
            }
        }
        
        .copy-button {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            color: #e2e8f0;
            padding: 0.25rem 0.5rem;
            cursor: pointer;
            font-size: 0.875rem;
            opacity: 0;
            transition: opacity 0.2s, background 0.2s;
        }
        
        .code-wrapper:hover .copy-button {
            opacity: 1;
        }
        
        .copy-button:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .copy-button.copied {
            background: var(--secondary-color);
            border-color: var(--secondary-color);
        }
        
        .code-wrapper {
            position: relative;
        }
    `;
    document.head.appendChild(style);
    
    header.querySelector('.header-content').appendChild(menuButton);
    
    menuButton.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // 点击链接后关闭菜单
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
        });
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
