// Dropdown Component Demo
export function initDropdownDemo() {
  const section = document.getElementById('dropdown');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📋 Dropdown Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Versatile dropdown with single-select, multi-select, and cascading options.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showSingleSelect()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Single Select</button>
      <button onclick="showMultiSelect()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Multi Select</button>
      <button onclick="showCascadingDropdown()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Cascading</button>
      <button onclick="showSearchableDropdown()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">Searchable</button>
      <button onclick="showDropdownSizes()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">Sizes</button>
      <button onclick="showDropdownPlayground()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Playground</button>
    </div>

    <div id="dropdownDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    showSingleSelect();
  }, 100);
}

window.showSingleSelect = function() {
  const container = document.getElementById('dropdownDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Single Select Dropdown</h3>
      <p>Standard dropdown with single selection.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 30px;">
        <div>
          <h4>Countries</h4>
          <ui-dropdown id="countriesDropdown" placeholder="Select a country"></ui-dropdown>
          <div id="countryOutput" style="margin-top: 10px; padding: 10px; background: #f0f9ff; border-radius: 6px; font-size: 14px; color: #1e40af;">
            No selection
          </div>
        </div>

        <div>
          <h4>Programming Languages</h4>
          <ui-dropdown id="languagesDropdown" placeholder="Select a language"></ui-dropdown>
          <div id="languageOutput" style="margin-top: 10px; padding: 10px; background: #f0fdf4; border-radius: 6px; font-size: 14px; color: #166534;">
            No selection
          </div>
        </div>

        <div>
          <h4>With Icons</h4>
          <ui-dropdown id="iconsDropdown" placeholder="Select an option"></ui-dropdown>
          <div id="iconOutput" style="margin-top: 10px; padding: 10px; background: #fef3c7; border-radius: 6px; font-size: 14px; color: #92400e;">
            No selection
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const countriesDropdown = document.getElementById('countriesDropdown');
    if (countriesDropdown) {
      countriesDropdown.options = JSON.stringify([
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
        { value: 'jp', label: 'Japan' },
        { value: 'in', label: 'India' }
      ]);

      countriesDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('countryOutput');
        if (output) {
          output.innerHTML = `Selected: <strong>${e.detail.selectedOptions[0]?.label || 'None'}</strong>`;
        }
      });
    }

    const languagesDropdown = document.getElementById('languagesDropdown');
    if (languagesDropdown) {
      languagesDropdown.options = JSON.stringify([
        { value: 'js', label: 'JavaScript' },
        { value: 'ts', label: 'TypeScript' },
        { value: 'py', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'cpp', label: 'C++' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
        { value: 'php', label: 'PHP' }
      ]);

      languagesDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('languageOutput');
        if (output) {
          output.innerHTML = `Selected: <strong>${e.detail.selectedOptions[0]?.label || 'None'}</strong>`;
        }
      });
    }

    const iconsDropdown = document.getElementById('iconsDropdown');
    if (iconsDropdown) {
      iconsDropdown.options = JSON.stringify([
        { value: 'home', label: 'Home', icon: '🏠' },
        { value: 'user', label: 'User', icon: '👤' },
        { value: 'settings', label: 'Settings', icon: '⚙️' },
        { value: 'email', label: 'Email', icon: '✉️' },
        { value: 'phone', label: 'Phone', icon: '📱' },
        { value: 'heart', label: 'Favorites', icon: '❤️' }
      ]);

      iconsDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('iconOutput');
        if (output && e.detail.selectedOptions[0]) {
          output.innerHTML = `Selected: ${e.detail.selectedOptions[0].icon} <strong>${e.detail.selectedOptions[0].label}</strong>`;
        }
      });
    }
  }, 100);
};

window.showMultiSelect = function() {
  const container = document.getElementById('dropdownDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Multi-Select Dropdown</h3>
      <p>Select multiple options with checkboxes.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 30px;">
        <div>
          <h4>Skills</h4>
          <ui-dropdown id="skillsDropdown" multi-select placeholder="Select your skills"></ui-dropdown>
          <div id="skillsOutput" style="margin-top: 10px; padding: 10px; background: #eff6ff; border-radius: 6px; font-size: 14px; color: #1e40af;">
            No skills selected
          </div>
        </div>

        <div>
          <h4>Fruits (With Icons)</h4>
          <ui-dropdown id="fruitsDropdown" multi-select placeholder="Select fruits"></ui-dropdown>
          <div id="fruitsOutput" style="margin-top: 10px; padding: 10px; background: #f0fdf4; border-radius: 6px; font-size: 14px; color: #166534;">
            No fruits selected
          </div>
        </div>

        <div>
          <h4>Technologies</h4>
          <ui-dropdown id="techDropdown" multi-select placeholder="Select technologies"></ui-dropdown>
          <div id="techOutput" style="margin-top: 10px; padding: 10px; background: #fef3c7; border-radius: 6px; font-size: 14px; color: #92400e;">
            No technologies selected
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const skillsDropdown = document.getElementById('skillsDropdown');
    if (skillsDropdown) {
      skillsDropdown.options = JSON.stringify([
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'js', label: 'JavaScript' },
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'angular', label: 'Angular' },
        { value: 'node', label: 'Node.js' },
        { value: 'python', label: 'Python' }
      ]);

      skillsDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('skillsOutput');
        if (output) {
          const selected = e.detail.selectedOptions.map(o => o.label).join(', ');
          output.innerHTML = selected ? `Selected: <strong>${selected}</strong>` : 'No skills selected';
        }
      });
    }

    const fruitsDropdown = document.getElementById('fruitsDropdown');
    if (fruitsDropdown) {
      fruitsDropdown.options = JSON.stringify([
        { value: 'apple', label: 'Apple', icon: '🍎' },
        { value: 'banana', label: 'Banana', icon: '🍌' },
        { value: 'orange', label: 'Orange', icon: '🍊' },
        { value: 'grape', label: 'Grape', icon: '🍇' },
        { value: 'strawberry', label: 'Strawberry', icon: '🍓' },
        { value: 'watermelon', label: 'Watermelon', icon: '🍉' }
      ]);

      fruitsDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('fruitsOutput');
        if (output) {
          const selected = e.detail.selectedOptions.map(o => `${o.icon} ${o.label}`).join(', ');
          output.innerHTML = selected ? `Selected: <strong>${selected}</strong>` : 'No fruits selected';
        }
      });
    }

    const techDropdown = document.getElementById('techDropdown');
    if (techDropdown) {
      techDropdown.options = JSON.stringify([
        { value: 'docker', label: 'Docker' },
        { value: 'k8s', label: 'Kubernetes' },
        { value: 'aws', label: 'AWS' },
        { value: 'azure', label: 'Azure' },
        { value: 'gcp', label: 'Google Cloud' },
        { value: 'jenkins', label: 'Jenkins' },
        { value: 'git', label: 'Git' }
      ]);

      techDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('techOutput');
        if (output) {
          const selected = e.detail.selectedOptions.map(o => o.label).join(', ');
          output.innerHTML = selected ? `Selected: <strong>${selected}</strong>` : 'No technologies selected';
        }
      });
    }
  }, 100);
};

window.showCascadingDropdown = function() {
  const container = document.getElementById('dropdownDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Cascading / Hierarchical Dropdown</h3>
      <p>Navigate through nested options with expandable nodes.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; margin-top: 30px;">
        <div>
          <h4>File System</h4>
          <ui-dropdown id="fileSystemDropdown" cascading multi-select placeholder="Browse files"></ui-dropdown>
          <div id="fileSystemOutput" style="margin-top: 10px; padding: 10px; background: #eff6ff; border-radius: 6px; font-size: 14px; color: #1e40af;">
            No files selected
          </div>
        </div>

        <div>
          <h4>Organization Structure</h4>
          <ui-dropdown id="orgDropdown" cascading multi-select placeholder="Select departments"></ui-dropdown>
          <div id="orgOutput" style="margin-top: 10px; padding: 10px; background: #f0fdf4; border-radius: 6px; font-size: 14px; color: #166534;">
            No departments selected
          </div>
        </div>

        <div>
          <h4>Product Categories</h4>
          <ui-dropdown id="categoryDropdown" cascading placeholder="Select category"></ui-dropdown>
          <div id="categoryOutput" style="margin-top: 10px; padding: 10px; background: #fef3c7; border-radius: 6px; font-size: 14px; color: #92400e;">
            No category selected
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const fileSystemDropdown = document.getElementById('fileSystemDropdown');
    if (fileSystemDropdown) {
      fileSystemDropdown.options = JSON.stringify([
        {
          value: 'root', label: '📁 Root', children: [
            {
              value: 'documents', label: '📁 Documents', children: [
                { value: 'doc1', label: '📄 Report.pdf' },
                { value: 'doc2', label: '📄 Presentation.pptx' }
              ]
            },
            {
              value: 'images', label: '📁 Images', children: [
                { value: 'img1', label: '🖼️ Photo1.jpg' },
                { value: 'img2', label: '🖼️ Photo2.png' }
              ]
            },
            {
              value: 'videos', label: '📁 Videos', children: [
                { value: 'vid1', label: '🎬 Movie.mp4' }
              ]
            }
          ]
        }
      ]);

      fileSystemDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('fileSystemOutput');
        if (output) {
          const selected = e.detail.selectedOptions.map(o => o.label).join(', ');
          output.innerHTML = selected ? `Selected: <strong>${selected}</strong>` : 'No files selected';
        }
      });
    }

    const orgDropdown = document.getElementById('orgDropdown');
    if (orgDropdown) {
      orgDropdown.options = JSON.stringify([
        {
          value: 'eng', label: 'Engineering', children: [
            { value: 'frontend', label: 'Frontend Team' },
            { value: 'backend', label: 'Backend Team' },
            { value: 'devops', label: 'DevOps Team' }
          ]
        },
        {
          value: 'sales', label: 'Sales', children: [
            { value: 'inside', label: 'Inside Sales' },
            { value: 'field', label: 'Field Sales' }
          ]
        },
        {
          value: 'marketing', label: 'Marketing', children: [
            { value: 'digital', label: 'Digital Marketing' },
            { value: 'content', label: 'Content Marketing' }
          ]
        }
      ]);

      orgDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('orgOutput');
        if (output) {
          const selected = e.detail.selectedOptions.map(o => o.label).join(', ');
          output.innerHTML = selected ? `Selected: <strong>${selected}</strong>` : 'No departments selected';
        }
      });
    }

    const categoryDropdown = document.getElementById('categoryDropdown');
    if (categoryDropdown) {
      categoryDropdown.options = JSON.stringify([
        {
          value: 'electronics', label: '⚡ Electronics', children: [
            {
              value: 'computers', label: '💻 Computers', children: [
                { value: 'laptops', label: 'Laptops' },
                { value: 'desktops', label: 'Desktops' }
              ]
            },
            {
              value: 'phones', label: '📱 Phones', children: [
                { value: 'smartphones', label: 'Smartphones' },
                { value: 'feature', label: 'Feature Phones' }
              ]
            }
          ]
        },
        {
          value: 'clothing', label: '👕 Clothing', children: [
            { value: 'mens', label: "Men's Wear" },
            { value: 'womens', label: "Women's Wear" }
          ]
        }
      ]);

      categoryDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('categoryOutput');
        if (output) {
          const selected = e.detail.selectedOptions[0]?.label || 'None';
          output.innerHTML = `Selected: <strong>${selected}</strong>`;
        }
      });
    }
  }, 100);
};

window.showSearchableDropdown = function() {
  const container = document.getElementById('dropdownDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Searchable Dropdown</h3>
      <p>Filter options with a search input.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 30px;">
        <div>
          <h4>Countries (Searchable)</h4>
          <ui-dropdown id="searchCountriesDropdown" searchable placeholder="Search countries..."></ui-dropdown>
          <div id="searchCountryOutput" style="margin-top: 10px; padding: 10px; background: #eff6ff; border-radius: 6px; font-size: 14px; color: #1e40af;">
            No selection
          </div>
        </div>

        <div>
          <h4>Multi-Select with Search</h4>
          <ui-dropdown id="searchMultiDropdown" searchable multi-select placeholder="Search and select..."></ui-dropdown>
          <div id="searchMultiOutput" style="margin-top: 10px; padding: 10px; background: #f0fdf4; border-radius: 6px; font-size: 14px; color: #166534;">
            No items selected
          </div>
        </div>

        <div>
          <h4>Cascading with Search</h4>
          <ui-dropdown id="searchCascadeDropdown" searchable cascading multi-select placeholder="Search hierarchy..."></ui-dropdown>
          <div id="searchCascadeOutput" style="margin-top: 10px; padding: 10px; background: #fef3c7; border-radius: 6px; font-size: 14px; color: #92400e;">
            No items selected
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const searchCountriesDropdown = document.getElementById('searchCountriesDropdown');
    if (searchCountriesDropdown) {
      searchCountriesDropdown.options = JSON.stringify([
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
        { value: 'jp', label: 'Japan' },
        { value: 'in', label: 'India' },
        { value: 'cn', label: 'China' },
        { value: 'br', label: 'Brazil' },
        { value: 'mx', label: 'Mexico' },
        { value: 'es', label: 'Spain' },
        { value: 'it', label: 'Italy' },
        { value: 'kr', label: 'South Korea' }
      ]);

      searchCountriesDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('searchCountryOutput');
        if (output) {
          output.innerHTML = `Selected: <strong>${e.detail.selectedOptions[0]?.label || 'None'}</strong>`;
        }
      });
    }

    const searchMultiDropdown = document.getElementById('searchMultiDropdown');
    if (searchMultiDropdown) {
      searchMultiDropdown.options = JSON.stringify([
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'js', label: 'JavaScript' },
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'angular', label: 'Angular' },
        { value: 'node', label: 'Node.js' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'csharp', label: 'C#' },
        { value: 'php', label: 'PHP' },
        { value: 'ruby', label: 'Ruby' }
      ]);

      searchMultiDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('searchMultiOutput');
        if (output) {
          const selected = e.detail.selectedOptions.map(o => o.label).join(', ');
          output.innerHTML = selected ? `Selected: <strong>${selected}</strong>` : 'No items selected';
        }
      });
    }

    const searchCascadeDropdown = document.getElementById('searchCascadeDropdown');
    if (searchCascadeDropdown) {
      searchCascadeDropdown.options = JSON.stringify([
        {
          value: 'frontend', label: 'Frontend', children: [
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' }
          ]
        },
        {
          value: 'backend', label: 'Backend', children: [
            { value: 'node', label: 'Node.js' },
            { value: 'python', label: 'Python' },
            { value: 'java', label: 'Java' }
          ]
        },
        {
          value: 'database', label: 'Database', children: [
            { value: 'mysql', label: 'MySQL' },
            { value: 'postgres', label: 'PostgreSQL' },
            { value: 'mongo', label: 'MongoDB' }
          ]
        }
      ]);

      searchCascadeDropdown.addEventListener('valueChange', (e) => {
        const output = document.getElementById('searchCascadeOutput');
        if (output) {
          const selected = e.detail.selectedOptions.map(o => o.label).join(', ');
          output.innerHTML = selected ? `Selected: <strong>${selected}</strong>` : 'No items selected';
        }
      });
    }
  }, 100);
};

window.showDropdownSizes = function() {
  const container = document.getElementById('dropdownDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Dropdown Sizes</h3>
      <p>Small, medium, and large size variants.</p>
      
      <div style="display: grid; gap: 30px; margin-top: 30px;">
        <div>
          <h4>Small (sm)</h4>
          <ui-dropdown id="smallDropdown" size="sm" placeholder="Small dropdown"></ui-dropdown>
        </div>

        <div>
          <h4>Medium (md) - Default</h4>
          <ui-dropdown id="mediumDropdown" size="md" placeholder="Medium dropdown"></ui-dropdown>
        </div>

        <div>
          <h4>Large (lg)</h4>
          <ui-dropdown id="largeDropdown" size="lg" placeholder="Large dropdown"></ui-dropdown>
        </div>

        <div>
          <h4>Disabled State</h4>
          <ui-dropdown id="disabledDropdown" disabled placeholder="Disabled dropdown"></ui-dropdown>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const options = JSON.stringify([
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]);

    ['smallDropdown', 'mediumDropdown', 'largeDropdown', 'disabledDropdown'].forEach(id => {
      const dropdown = document.getElementById(id);
      if (dropdown) {
        dropdown.options = options;
      }
    });
  }, 100);
};

window.showDropdownPlayground = function() {
  const container = document.getElementById('dropdownDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>🎮 Interactive Playground</h3>
      <p>Customize dropdown behavior and appearance.</p>
      
      <div style="display: grid; grid-template-columns: 300px 1fr; gap: 30px; margin-top: 30px;">
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; height: fit-content;">
          <h4 style="margin-top: 0;">Configuration</h4>
          
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 14px;">Mode</label>
            <select id="playMode" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;">
              <option value="single">Single Select</option>
              <option value="multi">Multi Select</option>
              <option value="cascade">Cascading</option>
            </select>
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
              <input type="checkbox" id="playSearchable" style="width: 16px; height: 16px;">
              <span>Searchable</span>
            </label>
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
              <input type="checkbox" id="playClearable" checked style="width: 16px; height: 16px;">
              <span>Clearable</span>
            </label>
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
              <input type="checkbox" id="playDisabled" style="width: 16px; height: 16px;">
              <span>Disabled</span>
            </label>
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 14px;">Size</label>
            <select id="playSize" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;">
              <option value="sm">Small</option>
              <option value="md" selected>Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500; font-size: 14px;">Max Height</label>
            <input type="number" id="playMaxHeight" value="300" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;">
          </div>

          <button onclick="updatePlaygroundDropdown()" style="width: 100%; padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Update Dropdown
          </button>
        </div>

        <div>
          <h4>Preview</h4>
          <ui-dropdown id="playgroundDropdown" placeholder="Configure and test dropdown"></ui-dropdown>
          
          <div id="playgroundOutput" style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 6px;">
            <h5 style="margin: 0 0 10px 0; color: #1e40af;">Output</h5>
            <div id="playgroundValue" style="font-size: 14px; color: #374151;">No selection</div>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    updatePlaygroundDropdown();
  }, 100);
};

window.updatePlaygroundDropdown = function() {
  const mode = document.getElementById('playMode').value;
  const searchable = document.getElementById('playSearchable').checked;
  const clearable = document.getElementById('playClearable').checked;
  const disabled = document.getElementById('playDisabled').checked;
  const size = document.getElementById('playSize').value;
  const maxHeight = parseInt(document.getElementById('playMaxHeight').value);

  const dropdown = document.getElementById('playgroundDropdown');
  if (!dropdown) return;

  // Set attributes
  dropdown.multiSelect = mode === 'multi';
  dropdown.cascading = mode === 'cascade';
  dropdown.searchable = searchable;
  dropdown.clearable = clearable;
  dropdown.disabled = disabled;
  dropdown.size = size;
  dropdown.maxHeight = maxHeight;
  dropdown.value = '';

  // Set options based on mode
  if (mode === 'cascade') {
    dropdown.options = JSON.stringify([
      {
        value: 'usa', label: '🇺🇸 USA', children: [
          { value: 'ny', label: 'New York' },
          { value: 'la', label: 'Los Angeles' },
          { value: 'chicago', label: 'Chicago' }
        ]
      },
      {
        value: 'uk', label: '🇬🇧 UK', children: [
          { value: 'london', label: 'London' },
          { value: 'manchester', label: 'Manchester' }
        ]
      }
    ]);
  } else {
    dropdown.options = JSON.stringify([
      { value: 'opt1', label: 'Option 1', icon: '⭐' },
      { value: 'opt2', label: 'Option 2', icon: '🎯' },
      { value: 'opt3', label: 'Option 3', icon: '🚀' },
      { value: 'opt4', label: 'Option 4', icon: '💎' },
      { value: 'opt5', label: 'Option 5', icon: '🔥' }
    ]);
  }

  // Update output
  dropdown.addEventListener('valueChange', (e) => {
    const output = document.getElementById('playgroundValue');
    if (output) {
      const selected = e.detail.selectedOptions.map(o => o.label).join(', ');
      output.innerHTML = selected ? `<strong>Selected:</strong> ${selected}<br><strong>Value:</strong> ${e.detail.value}` : 'No selection';
    }
  });
};
