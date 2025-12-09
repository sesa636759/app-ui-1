// Component Demo Functions
export function initTreeListDemo() {
  const section = document.getElementById('tree-list');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🌳 Tree List Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Hierarchical tree structure with expand/collapse and selection.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicTree()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showCheckboxTree()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">With Checkboxes</button>
      <button onclick="showIconTree()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">With Icons</button>
      <button onclick="showTreeLocked()" style="padding: 8px 16px; background-color: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer;">🔒 Lock Icons</button>
      <button onclick="showTreeWithAvatarGroups()" style="padding: 8px 16px; background-color: #7c3aed; color: white; border: none; border-radius: 6px; cursor: pointer;">👥 Avatar Groups</button>
      <button onclick="showInteractiveTree()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="treeDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    // Tree List Demo Functions
    window.showBasicTree = function() {
    const container = document.getElementById('treeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Basic Tree List</h4>
        <p style="color: #6b7280; font-size: 13px;">Simple hierarchical tree with expand/collapse functionality</p>
        <ui-tree-list id="basicTree"></ui-tree-list>
        <div id="treeLog" style="margin-top: 20px; padding: 12px; background: #f0f9ff; border-radius: 6px; font-size: 13px;">
          <strong>Event Log:</strong>
          <div style="margin-top: 8px; color: #6b7280;">Interact with the tree to see events...</div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const tree = document.getElementById('basicTree');
      if (tree) {
        tree.data = [
          {
            key: 1,
            label: 'Documents',
            children: [
              {
                key: 2,
                label: 'Work',
                children: [
                  { key: 3, label: 'Reports' },
                  { key: 4, label: 'Presentations' }
                ]
              },
              { key: 5, label: 'Personal' }
            ]
          },
          {
            key: 6,
            label: 'Downloads',
            children: [
              { key: 7, label: 'Images' },
              { key: 8, label: 'Videos' }
            ]
          },
          { key: 9, label: 'Desktop' }
        ];

        tree.addEventListener('treeExpand', (e) => {
          const log = document.querySelector('#treeLog div');
          if (log) {
            log.innerHTML = `<div style="color: #1e40af;"><strong>Expand:</strong> "${e.detail.node.label}" ${e.detail.expanded ? 'expanded' : 'collapsed'}</div>`;
          }
        });

        tree.addEventListener('treeSelect', (e) => {
          const log = document.querySelector('#treeLog div');
          if (log) {
            log.innerHTML = `<div style="color: #059669;"><strong>Select:</strong> "${e.detail.node.label}" selected</div>`;
          }
        });
      }
    }, 100);
  };

  window.showTreeWithIcons = function() {
    const container = document.getElementById('treeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Tree with Icons</h4>
        <p style="color: #6b7280; font-size: 13px;">File system structure with custom icons</p>
        <ui-tree-list id="iconTree"></ui-tree-list>
      </div>
    `;
    setTimeout(() => {
      const tree = document.getElementById('iconTree');
      if (tree) {
        tree.data = [
          {
            key: 1,
            label: 'src',
            icon: '📁',
            children: [
              {
                key: 2,
                label: 'components',
                icon: '📁',
                children: [
                  { key: 3, label: 'Button.tsx', icon: '📄' },
                  { key: 4, label: 'Input.tsx', icon: '📄' },
                  { key: 5, label: 'Card.tsx', icon: '📄' }
                ]
              },
              {
                key: 6,
                label: 'utils',
                icon: '📁',
                children: [
                  { key: 7, label: 'helpers.ts', icon: '📝' },
                  { key: 8, label: 'validators.ts', icon: '📝' }
                ]
              },
              { key: 9, label: 'index.ts', icon: '📝' }
            ]
          },
          {
            key: 10,
            label: 'public',
            icon: '📁',
            children: [
              { key: 11, label: 'index.html', icon: '🌐' },
              { key: 12, label: 'favicon.ico', icon: '🖼️' }
            ]
          },
          { key: 13, label: 'package.json', icon: '📦' },
          { key: 14, label: 'README.md', icon: '📖' }
        ];
      }
    }, 100);
  };

  window.showCheckboxTree = function() {
    const container = document.getElementById('treeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Tree with Checkboxes</h4>
        <p style="color: #6b7280; font-size: 13px;">Select multiple items using checkboxes</p>
        <ui-tree-list id="checkboxTree" show-checkbox="true" multi-select="true"></ui-tree-list>
        <div id="selectedItems" style="margin-top: 16px; padding: 12px; background-color: #f3f4f6; border-radius: 6px;">
          <strong>Selected Items:</strong> <span id="selectedCount">0</span>
        </div>
      </div>
    `;
    setTimeout(() => {
      const tree = document.getElementById('checkboxTree');
      if (tree) {
        tree.data = [
          {
            key: 1,
            label: 'Features',
            icon: '⭐',
            children: [
              { key: 2, label: 'Authentication', icon: '🔐' },
              { key: 3, label: 'Dashboard', icon: '📊' },
              { key: 4, label: 'Notifications', icon: '🔔' }
            ]
          },
          {
            key: 5,
            label: 'Settings',
            icon: '⚙️',
            children: [
              { key: 6, label: 'Profile', icon: '👤' },
              { key: 7, label: 'Security', icon: '🔒' },
              { key: 8, label: 'Privacy', icon: '🛡️' }
            ]
          }
        ];
        
        tree.addEventListener('treeCheck', (e) => {
          const count = e.detail.checkedKeys.length;
          document.getElementById('selectedCount').textContent = count;
        });
      }
    }, 100);
  };

  window.showTreeWithAvatars = function() {
    const container = document.getElementById('treeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Tree with Avatars</h4>
        <p style="color: #6b7280; font-size: 13px;">Organization hierarchy with team member avatars</p>
        <ui-tree-list id="avatarTree" size="lg"></ui-tree-list>
      </div>
    `;
    setTimeout(() => {
      const tree = document.getElementById('avatarTree');
      if (tree) {
        tree.data = [
          {
            key: 1,
            label: 'Executive Team',
            icon: '👔',
            avatar: '👨‍💼',
            children: [
              {
                key: 2,
                label: 'Engineering',
                icon: '⚙️',
                avatar: '👨‍💻',
                children: [
                  { key: 3, label: 'Frontend Team', icon: '🎨', avatar: '👩‍💻' },
                  { key: 4, label: 'Backend Team', icon: '🔧', avatar: '👨‍🔧' },
                  { key: 5, label: 'DevOps', icon: '🚀', avatar: '👨‍🚀' }
                ]
              },
              {
                key: 6,
                label: 'Product',
                icon: '📊',
                avatar: '👩‍💼',
                children: [
                  { key: 7, label: 'Product Managers', icon: '📋', avatar: '👤' },
                  { key: 8, label: 'UX Designers', icon: '🎨', avatar: '👨‍🎨' }
                ]
              },
              {
                key: 9,
                label: 'Marketing',
                icon: '📢',
                avatar: '👩‍💼'
              }
            ]
          },
          {
            key: 10,
            label: 'Operations',
            icon: '🏢',
            avatar: '👔'
          }
        ];
      }
    }, 100);
  };

  window.showTreeLocked = function() {
    const container = document.getElementById('treeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Tree with Lock Icons & Tooltips</h4>
        <p style="color: #6b7280; font-size: 13px;">Items with lock icons and custom tooltips indicating restrictions</p>
        <ui-tree-list id="lockedTree"></ui-tree-list>
        <div style="margin-top: 16px; padding: 12px; background: #fef3c7; border-radius: 6px; border: 1px solid #f59e0b;">
          <strong style="color: #92400e;">🔒 Features:</strong>
          <ul style="color: #78350f; margin: 8px 0 0 20px; font-size: 13px;">
            <li>SVG lock icons for better visual clarity</li>
            <li>Custom tooltips via <code>lockTooltip</code> property</li>
            <li>Lock/Unlock actions in context menu</li>
            <li>Hover effects on lock icons</li>
          </ul>
        </div>
      </div>
    `;
    setTimeout(() => {
      const tree = document.getElementById('lockedTree');
      if (tree) {
        tree.data = [
          {
            key: 1,
            label: 'Production Environment',
            icon: '🏭',
            locked: true,
            lockTooltip: 'Production access requires admin approval',
            avatar: 'https://i.pravatar.cc/150?img=1',
            children: [
              { 
                key: 2, 
                label: 'Database Config', 
                icon: '🗄️', 
                locked: true,
                lockTooltip: 'Critical system file - read-only'
              },
              { 
                key: 3, 
                label: 'API Keys', 
                icon: '🔑', 
                locked: true,
                lockTooltip: 'Encrypted secrets - admin only',
                avatar: 'https://i.pravatar.cc/150?img=2'
              },
              { key: 4, label: 'Logs', icon: '📋', avatar: 'https://i.pravatar.cc/150?img=3' }
            ]
          },
          {
            key: 5,
            label: 'Development Environment',
            icon: '💻',
            children: [
              { 
                key: 6, 
                label: 'Staging Deploy', 
                icon: '🚀',
                locked: true,
                lockTooltip: 'Deployment in progress - locked temporarily'
              },
              { key: 7, label: 'Feature Branches', icon: '🌿' }
            ]
          },
          {
            key: 8,
            label: 'Archived Data',
            icon: '📦',
            locked: true,
            lockTooltip: 'Historical data - preserved for compliance',
            avatar: 'https://i.pravatar.cc/150?img=5'
          }
        ];

        tree.addEventListener('treeAction', (e) => {
          console.log('Tree Action:', e.detail);
          alert(`Action: ${e.detail.action}\\nNode: "${e.detail.node.label}"${e.detail.node.lockTooltip ? '\\nReason: ' + e.detail.node.lockTooltip : ''}`);
        });
      }
    }, 100);
  };

  window.showTreeMultiSelect = function() {
    const container = document.getElementById('treeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Multi-Select Tree</h4>
        <p style="color: #6b7280; font-size: 13px;">Select multiple items at once</p>
        <ui-tree-list id="multiTree" multi-select="true" default-expand-all="true"></ui-tree-list>
        <div id="selectionLog" style="margin-top: 20px; padding: 12px; background: #f0f9ff; border-radius: 6px; font-size: 13px;">
          <strong>Selected Items:</strong>
          <div style="margin-top: 8px; color: #6b7280;">None selected</div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const tree = document.getElementById('multiTree');
      if (tree) {
        tree.data = [
          {
            key: 1,
            label: 'Q4 Goals',
            icon: '🎯',
            children: [
              {
                key: 2,
                label: 'Launch Product',
                icon: '🚀',
                children: [
                  { key: 3, label: 'Design Phase', icon: '✅' },
                  { key: 4, label: 'Development', icon: '⏳' },
                  { key: 5, label: 'Testing', icon: '📝' },
                  { key: 6, label: 'Deployment', icon: '🌐' }
                ]
              },
              {
                key: 7,
                label: 'Marketing Campaign',
                icon: '📢',
                children: [
                  { key: 8, label: 'Social Media', icon: '📱' },
                  { key: 9, label: 'Email Campaign', icon: '✉️' }
                ]
              }
            ]
          },
          {
            key: 10,
            label: 'Team Building',
            icon: '👥',
            children: [
              { key: 11, label: 'Workshops', icon: '🎓' },
              { key: 12, label: 'Team Outing', icon: '🎉' }
            ]
          }
        ];

        let selectedCount = 0;
        tree.addEventListener('treeSelect', (e) => {
          selectedCount = e.detail.selected ? selectedCount + 1 : selectedCount - 1;
          const log = document.querySelector('#selectionLog div');
          if (log) {
            log.innerHTML = selectedCount > 0 
              ? `<div style="color: #059669;">${selectedCount} item(s) selected</div>`
              : '<div style="color: #6b7280;">None selected</div>';
          }
        });
      }
    }, 100);
  };

  window.showTreeWithAvatarGroups = function() {
    const container = document.getElementById('treeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h4>Tree with Avatar Groups</h4>
        <p style="color: #6b7280; font-size: 13px;">Multiple collaborators shown as avatar groups on each node</p>
        <ui-tree-list id="avatarGroupTree" size="md"></ui-tree-list>
        <div style="margin-top: 16px; padding: 12px; background: #ede9fe; border-radius: 6px; border: 1px solid #7c3aed;">
          <strong style="color: #5b21b6;">👥 Avatar Groups:</strong>
          <ul style="color: #6b21a8; margin: 8px 0 0 20px; font-size: 13px;">
            <li>Display multiple team members per node</li>
            <li>Supports avatar images, initials, and custom colors</li>
            <li>Automatically limits display (max 3 by default)</li>
            <li>Perfect for showing collaborative ownership</li>
          </ul>
        </div>
      </div>
    `;
    setTimeout(() => {
      const tree = document.getElementById('avatarGroupTree');
      if (tree) {
        tree.data = [
          {
            key: 1,
            label: 'Q1 Financial Report',
            icon: '📊',
            avatars: [
              { src: 'https://i.pravatar.cc/150?img=10', label: 'Emma - CFO' },
              { src: 'https://i.pravatar.cc/150?img=11', label: 'Oliver - Analyst' },
              { src: 'https://i.pravatar.cc/150?img=12', label: 'Sophia - Manager' },
              { initials: 'JD', color: 'purple', label: 'John - Director' }
            ],
            children: [
              {
                key: 2,
                label: 'Executive Summary',
                icon: '📝',
                locked: true,
                lockTooltip: 'Approved by board - no edits allowed',
                avatar: 'https://i.pravatar.cc/150?img=10'
              },
              {
                key: 3,
                label: 'Revenue Analysis',
                icon: '💰',
                avatars: [
                  { src: 'https://i.pravatar.cc/150?img=11', label: 'Oliver' },
                  { src: 'https://i.pravatar.cc/150?img=12', label: 'Sophia' }
                ]
              }
            ]
          },
          {
            key: 4,
            label: 'Marketing Campaign 2024',
            icon: '📢',
            avatars: [
              { src: 'https://i.pravatar.cc/150?img=20', label: 'Alex - Lead' },
              { src: 'https://i.pravatar.cc/150?img=21', label: 'Nina - Designer' },
              { initials: 'RC', color: 'green', label: 'Rachel - Copywriter' }
            ],
            children: [
              {
                key: 5,
                label: 'Social Media Strategy',
                icon: '📱',
                avatars: [
                  { src: 'https://i.pravatar.cc/150?img=20', label: 'Alex' },
                  { initials: 'SM', color: 'blue', label: 'Sarah - Manager' }
                ]
              },
              {
                key: 6,
                label: 'Budget Allocation',
                icon: '💵',
                locked: true,
                lockTooltip: 'Budget finalized and locked',
                avatars: [
                  { src: 'https://i.pravatar.cc/150?img=21', label: 'Nina' },
                  { initials: 'RC', color: 'green', label: 'Rachel' }
                ]
              }
            ]
          },
          {
            key: 7,
            label: 'Product Development',
            icon: '🚀',
            avatars: [
              { src: 'https://i.pravatar.cc/150?img=30', label: 'Mike - PM' },
              { src: 'https://i.pravatar.cc/150?img=31', label: 'Lisa - Dev' },
              { src: 'https://i.pravatar.cc/150?img=32', label: 'Tom - QA' },
              { initials: '+5', color: 'gray', label: '5 more team members' }
            ],
            children: [
              {
                key: 8,
                label: 'Feature Specifications',
                icon: '📋',
                avatars: [
                  { src: 'https://i.pravatar.cc/150?img=30', label: 'Mike' },
                  { initials: 'DS', color: 'orange', label: 'Dan - Designer' }
                ]
              },
              {
                key: 9,
                label: 'Development Sprint',
                icon: '💻',
                avatars: [
                  { src: 'https://i.pravatar.cc/150?img=31', label: 'Lisa' },
                  { initials: 'BJ', color: 'red', label: 'Bob - Backend' },
                  { initials: 'AK', color: 'cyan', label: 'Anna - Frontend' }
                ]
              }
            ]
          }
        ];

        tree.addEventListener('treeAction', (e) => {
          console.log('Tree Action:', e.detail);
          const avatarInfo = e.detail.node.avatars 
            ? `\\nCollaborators: ${e.detail.node.avatars.length}` 
            : '';
          alert(`Action: ${e.detail.action}\\nNode: "${e.detail.node.label}"${avatarInfo}`);
        });

        tree.addEventListener('treeSelect', (e) => {
          console.log('Selected node:', e.detail.node);
        });
      }
    }, 100);
  };

  window.showTreeSizes = function() {
    const container = document.getElementById('treeDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto;">
        <h4>Tree Size Variants</h4>
        <p style="color: #6b7280; font-size: 13px; margin-bottom: 24px;">Small, medium, and large size options</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
          <div>
            <h5 style="margin: 0 0 8px 0; color: #374151;">Small</h5>
            <ui-tree-list id="smallTree" size="sm"></ui-tree-list>
          </div>
          <div>
            <h5 style="margin: 0 0 8px 0; color: #374151;">Medium (Default)</h5>
            <ui-tree-list id="mediumTree" size="md"></ui-tree-list>
          </div>
          <div>
            <h5 style="margin: 0 0 8px 0; color: #374151;">Large</h5>
            <ui-tree-list id="largeTree" size="lg"></ui-tree-list>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const sampleData = [
        {
          key: 1,
          label: 'Projects',
          icon: '📁',
          avatar: '👤',
          children: [
            { key: 2, label: 'Website', icon: '🌐', avatar: '👨‍💻' },
            { key: 3, label: 'Mobile App', icon: '📱', locked: true }
          ]
        },
        { key: 4, label: 'Documents', icon: '📄' }
      ];

      ['smallTree', 'mediumTree', 'largeTree'].forEach(id => {
        const tree = document.getElementById(id);
        if (tree) tree.data = JSON.parse(JSON.stringify(sampleData));
      });
    }, 100);
  };

  window.initHomeTree = function() {
    const tree = document.getElementById('homeTree');
    if (!tree) return;
    
    setTimeout(() => {
      tree.data = [
        {
          key: 1,
          label: 'Production Files',
          icon: '📁',
          locked: true,
          lockTooltip: 'Production environment - restricted access',
          avatars: [
            { src: 'https://i.pravatar.cc/150?img=1', label: 'Admin' },
            { initials: 'DV', color: 'blue', label: 'DevOps' }
          ],
          children: [
            { 
              key: 2, 
              label: 'API Config', 
              icon: '⚙️',
              locked: true,
              lockTooltip: 'System configuration',
              avatar: 'https://i.pravatar.cc/150?img=1'
            },
            { 
              key: 3, 
              label: 'Deployment Scripts', 
              icon: '🚀',
              avatars: [
                { src: 'https://i.pravatar.cc/150?img=2', label: 'Dev1' },
                { initials: 'D2', color: 'green' }
              ]
            }
          ]
        },
        {
          key: 4,
          label: 'Team Documents',
          icon: '📄',
          avatars: [
            { src: 'https://i.pravatar.cc/150?img=5', label: 'Alice' },
            { src: 'https://i.pravatar.cc/150?img=6', label: 'Bob' },
            { initials: '+3', color: 'gray', label: '3 more' }
          ],
          children: [
            { key: 5, label: 'Reports', icon: '📊', avatar: 'https://i.pravatar.cc/150?img=5' },
            { key: 6, label: 'Plans', icon: '📋', locked: true, lockTooltip: 'Approved plan' }
          ]
        }
      ];
    }, 200);
  };

  showBasicTree();
  }, 100);
}

// Interactive Playground Functions
window.showInteractiveTree = function() {
  const container = document.getElementById('treeDemoContainer');
  if (!container) return;
  
  container.innerHTML = `
    <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <div style="display: flex; gap: 30px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h3 style="margin-top: 0;">🎮 Interactive Playground</h3>
          <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Size:</label>
              <select id="treeSize" onchange="updateInteractiveTree()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="sm">Small</option>
                <option value="md" selected>Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="treeMultiSelect" onchange="updateInteractiveTree()" style="cursor: pointer;">
              <label for="treeMultiSelect" style="cursor: pointer;">Multi Select</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="treeShowExpandIcon" checked onchange="updateInteractiveTree()" style="cursor: pointer;">
              <label for="treeShowExpandIcon" style="cursor: pointer;">Show Expand Icon</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="treeShowLines" checked onchange="updateInteractiveTree()" style="cursor: pointer;">
              <label for="treeShowLines" style="cursor: pointer;">Show Lines</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="treeSelectable" checked onchange="updateInteractiveTree()" style="cursor: pointer;">
              <label for="treeSelectable" style="cursor: pointer;">Selectable</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="treeDefaultExpandAll" onchange="updateInteractiveTree()" style="cursor: pointer;">
              <label for="treeDefaultExpandAll" style="cursor: pointer;">Expand All by Default</label>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="treeDisabled" onchange="updateInteractiveTree()" style="cursor: pointer;">
              <label for="treeDisabled" style="cursor: pointer;">Disabled</label>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Tree Data (JSON):</label>
              <textarea id="treeData" onchange="updateInteractiveTree()" 
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-family: monospace; font-size: 12px; min-height: 200px;">[
  {
    "key": 1,
    "label": "Documents",
    "icon": "📁",
    "children": [
      {
        "key": 2,
        "label": "Work",
        "icon": "💼",
        "children": [
          {"key": 3, "label": "Reports", "icon": "📊"},
          {"key": 4, "label": "Presentations", "icon": "📽️"}
        ]
      },
      {"key": 5, "label": "Personal", "icon": "👤"}
    ]
  },
  {
    "key": 6,
    "label": "Photos",
    "icon": "📷",
    "children": [
      {"key": 7, "label": "Vacation", "icon": "🏖️"},
      {"key": 8, "label": "Family", "icon": "👨‍👩‍👧‍👦"}
    ]
  }
]</textarea>
            </div>
          </div>
        </div>
        
        <div style="flex: 1; min-width: 300px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h4 style="margin-top: 0;">Preview:</h4>
          <div id="interactiveTreeContainer" style="margin-top: 20px;"></div>
          <div id="treeOutput" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px; display: none;"></div>
        </div>
      </div>
    </div>
  `;
  
  updateInteractiveTree();
};

window.updateInteractiveTree = function() {
  const size = document.getElementById('treeSize').value;
  const multiSelect = document.getElementById('treeMultiSelect').checked;
  const showExpandIcon = document.getElementById('treeShowExpandIcon').checked;
  const showLines = document.getElementById('treeShowLines').checked;
  const selectable = document.getElementById('treeSelectable').checked;
  const defaultExpandAll = document.getElementById('treeDefaultExpandAll').checked;
  const disabled = document.getElementById('treeDisabled').checked;
  const dataText = document.getElementById('treeData').value;
  
  const container = document.getElementById('interactiveTreeContainer');
  const outputDiv = document.getElementById('treeOutput');
  
  if (!container) return;
  
  try {
    const data = JSON.parse(dataText);
    
    container.innerHTML = `
      <ui-tree-list
        id="interactiveTreeComponent"
        size="${size}"
        ${multiSelect ? 'multi-select="true"' : 'multi-select="false"'}
        ${showExpandIcon ? 'show-expand-icon="true"' : 'show-expand-icon="false"'}
        ${showLines ? 'show-lines="true"' : 'show-lines="false"'}
        ${selectable ? 'selectable="true"' : 'selectable="false"'}
        ${defaultExpandAll ? 'default-expand-all="true"' : 'default-expand-all="false"'}
        ${disabled ? 'disabled="true"' : ''}
      ></ui-tree-list>
    `;
    
    setTimeout(() => {
      const tree = document.getElementById('interactiveTreeComponent');
      if (tree) {
        tree.data = data;
        
        tree.addEventListener('treeExpand', (event) => {
          if (outputDiv) {
            outputDiv.style.display = 'block';
            outputDiv.textContent = `Node ${event.detail.expanded ? 'expanded' : 'collapsed'}: "${event.detail.node.label}"`;
          }
        });
        
        tree.addEventListener('treeSelect', (event) => {
          if (outputDiv) {
            outputDiv.style.display = 'block';
            outputDiv.textContent = `Node selected: "${event.detail.node.label}"`;
          }
        });
      }
    }, 100);
    
    if (outputDiv) {
      outputDiv.style.display = 'none';
    }
  } catch (error) {
    if (outputDiv) {
      outputDiv.style.display = 'block';
      outputDiv.style.color = '#ef4444';
      outputDiv.textContent = `Invalid JSON: ${error.message}`;
    }
  }
};
