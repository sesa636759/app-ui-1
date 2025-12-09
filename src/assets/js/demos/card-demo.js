// Card Demo Functions
export function initCardDemo() {
  const section = document.getElementById('card');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">🃏 Card Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Versatile cards with headers, content, footers, and special features like flipping.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicCards()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic Cards</button>
      <button onclick="showVariantCards()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Variants</button>
      <button onclick="showFlippableCards()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Flippable</button>
      <button onclick="showInteractiveCard()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="cardDemoContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 20px;"></div>
  `;

  // Initialize with basic cards
  setTimeout(() => showBasicCards(), 100);

  window.showBasicCards = function () {
    const cardContainer = document.getElementById('cardDemoContainer');
    if (!cardContainer) return;
    cardContainer.innerHTML = `
      <ui-card width="350px" variant="default">
        <div slot="header">
          <h3 style="margin: 0; font-size: 18px; color: #1f2937;">Basic Card</h3>
        </div>
        <div slot="content">
          <p style="margin: 0 0 12px; color: #6b7280;">This is a basic card with header, content, and footer sections.</p>
          <p style="margin: 0; color: #9ca3af; font-size: 14px;">Perfect for displaying simple information.</p>
        </div>
        <div slot="footer">
          <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Action</button>
        </div>
      </ui-card>

      <ui-card width="350px" variant="default" hoverable="true">
        <div slot="header">
          <h3 style="margin: 0; font-size: 18px; color: #1f2937;">Hoverable Card</h3>
        </div>
        <div slot="content">
          <p style="margin: 0 0 12px; color: #6b7280;">This card has a hover effect. Try hovering over it!</p>
          <div style="padding: 12px; background-color: #f0f9ff; border-radius: 6px; margin-top: 12px;">
            <span style="font-size: 24px;">✨</span>
            <p style="margin: 8px 0 0; color: #0369a1; font-size: 14px;">Hover me for animation</p>
          </div>
        </div>
      </ui-card>

      <ui-card width="350px" variant="default">
        <div slot="header">
          <h3 style="margin: 0; font-size: 18px; color: #1f2937;">Content Card</h3>
        </div>
        <div slot="content">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <span style="font-size: 32px;">📊</span>
            <div>
              <p style="margin: 0; font-weight: 600; color: #1f2937;">Statistics</p>
              <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">View your data</p>
            </div>
          </div>
          <div style="padding: 10px; background-color: #f9fafb; border-radius: 4px;">
            <p style="margin: 0; font-size: 20px; font-weight: bold; color: #059669;">+24.5%</p>
            <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">vs last month</p>
          </div>
        </div>
      </ui-card>
    `;
  };

  window.showVariantCards = function () {
    const cardContainer = document.getElementById('cardDemoContainer');
    if (!cardContainer) return;
    cardContainer.innerHTML = `
      <ui-card width="300px" variant="default">
        <div slot="header">
          <h3 style="margin: 0; font-size: 16px; color: #1f2937;">Default</h3>
        </div>
        <div slot="content">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Standard card with subtle shadow and border.</p>
        </div>
      </ui-card>

      <ui-card width="300px" variant="elevated">
        <div slot="header">
          <h3 style="margin: 0; font-size: 16px; color: #1f2937;">Elevated</h3>
        </div>
        <div slot="content">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Elevated card with enhanced shadow for depth.</p>
        </div>
      </ui-card>

      <ui-card width="300px" variant="outlined">
        <div slot="header">
          <h3 style="margin: 0; font-size: 16px; color: #1f2937;">Outlined</h3>
        </div>
        <div slot="content">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Outlined card with transparent background.</p>
        </div>
      </ui-card>

      <ui-card width="300px" variant="filled">
        <div slot="header">
          <h3 style="margin: 0; font-size: 16px; color: #1f2937;">Filled</h3>
        </div>
        <div slot="content">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Filled card with colored background.</p>
        </div>
      </ui-card>
    `;
  };

  window.showFlippableCards = function () {
    const cardContainer = document.getElementById('cardDemoContainer');
    if (!cardContainer) return;
    cardContainer.innerHTML = `
      <ui-card width="350px" height="250px" variant="elevated" flippable="true">
        <div slot="header">
          <h3 style="margin: 0; font-size: 18px; color: #1f2937;">🔄 Flip Me!</h3>
        </div>
        <div slot="content">
          <div style="text-align: center; padding: 20px 0;">
            <p style="margin: 0 0 12px; color: #6b7280; font-size: 16px;">Click anywhere to flip this card</p>
            <span style="font-size: 48px;">🎴</span>
            <p style="margin: 12px 0 0; color: #9ca3af; font-size: 14px;">See what's on the other side!</p>
          </div>
        </div>
        <div slot="back-content">
          <div style="padding: 20px; text-align: center;">
            <span style="font-size: 48px;">✨</span>
            <h3 style="margin: 16px 0; color: #1f2937;">Back Side</h3>
            <p style="margin: 0; color: #6b7280;">This is the back of the card. Click the arrow button to flip back.</p>
          </div>
        </div>
      </ui-card>

      <ui-card width="350px" height="250px" variant="default" flippable="true">
        <div slot="header">
          <h3 style="margin: 0; font-size: 18px; color: #1f2937;">Product Info</h3>
        </div>
        <div slot="content">
          <div style="padding: 10px 0;">
            <p style="margin: 0 0 8px; font-weight: 600; color: #1f2937;">Premium Widget</p>
            <p style="margin: 0 0 12px; color: #6b7280; font-size: 14px;">High-quality product for your needs</p>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #059669;">$99.99</p>
            <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px;">Click to see specifications</p>
          </div>
        </div>
        <div slot="back-content">
          <div style="padding: 20px;">
            <h4 style="margin: 0 0 12px; color: #1f2937;">Specifications</h4>
            <ul style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 14px;">
              <li>Material: Premium Quality</li>
              <li>Weight: 2.5 kg</li>
              <li>Dimensions: 30x20x10 cm</li>
              <li>Warranty: 2 years</li>
              <li>Color: Multiple options</li>
            </ul>
          </div>
        </div>
      </ui-card>
    `;
  };

  window.showCardsWithMenu = function () {
    const cardContainer = document.getElementById('cardDemoContainer');
    if (!cardContainer) return;
    const menuItems = JSON.stringify([
      { id: 'edit', label: 'Edit', icon: '✏️' },
      { id: 'share', label: 'Share', icon: '🔗' },
      { id: 'separator1', separator: true },
      { id: 'delete', label: 'Delete', icon: '🗑️' }
    ]);

    cardContainer.innerHTML = `
      <ui-card width="350px" variant="elevated" show-menu="true" menu-items='${menuItems}' card-id="card1">
        <div slot="header">
          <h3 style="margin: 0; font-size: 18px; color: #1f2937;">Card with Menu</h3>
        </div>
        <div slot="content">
          <p style="margin: 0 0 12px; color: #6b7280;">This card has a contextual menu. Click the three dots in the header.</p>
          <div style="padding: 12px; background-color: #fef3c7; border-radius: 6px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">⋮ Menu available in header</p>
          </div>
        </div>
      </ui-card>

      <ui-card width="350px" variant="default" show-menu="true" menu-items='${menuItems}' card-id="card2">
        <div slot="header">
          <h3 style="margin: 0; font-size: 18px; color: #1f2937;">Project Dashboard</h3>
        </div>
        <div slot="content">
          <div style="margin-bottom: 12px;">
            <p style="margin: 0 0 8px; font-weight: 600; color: #1f2937;">Active Tasks</p>
            <div style="display: flex; gap: 8px;">
              <span style="padding: 4px 8px; background-color: #dbeafe; color: #1e40af; border-radius: 4px; font-size: 12px;">12 Open</span>
              <span style="padding: 4px 8px; background-color: #d1fae5; color: #065f46; border-radius: 4px; font-size: 12px;">8 Done</span>
            </div>
          </div>
        </div>
        <div slot="footer">
          <button style="padding: 6px 12px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">View Details</button>
        </div>
      </ui-card>
    `;

    // Setup event listeners
    setTimeout(() => {
      document.querySelectorAll('ui-card').forEach(card => {
        card.addEventListener('menuItemClick', (event) => {
          alert(`Menu item clicked: ${event.detail.id}`);
        });
      });
    }, 100);
  };

  window.showInteractiveCard = function() {
    const cardContainer = document.getElementById('cardDemoContainer');
    if (!cardContainer) return;
    
    cardContainer.style.display = 'block';
    cardContainer.innerHTML = `
      <div class="demo-block">
        <h3>🎮 Interactive Playground</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Customize the card properties and see changes in real-time!</p>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 16px;">Settings</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Variant:</span>
              <select id="cardVariant" style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                <option value="default" selected>Default</option>
                <option value="elevated">Elevated</option>
                <option value="outlined">Outlined</option>
                <option value="filled">Filled</option>
              </select>
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Width:</span>
              <input type="text" id="cardWidth" value="400px" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Border Radius:</span>
              <input type="text" id="cardBorderRadius" value="8px" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span>Border:</span>
              <input type="text" id="cardBorder" value="1px solid #e5e7eb" 
                style="padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="cardHoverable" style="cursor: pointer;">
              <span>Hoverable</span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="cardFlippable" style="cursor: pointer;">
              <span>Flippable</span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="cardShowMenu" style="cursor: pointer;">
              <span>Show Menu</span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 8px; padding-top: 20px;">
              <input type="checkbox" id="cardExpandable" style="cursor: pointer;">
              <span>Expandable</span>
            </label>
          </div>
          <button onclick="updateInteractiveCard()" 
            style="margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Apply Changes
          </button>
        </div>
        
        <div style="display: flex; justify-content: center; padding: 40px;">
          <div id="interactiveCardContainer"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      updateInteractiveCard();
    }, 50);
  };

  window.updateInteractiveCard = function() {
    const variant = document.getElementById('cardVariant').value;
    const width = document.getElementById('cardWidth').value;
    const borderRadius = document.getElementById('cardBorderRadius').value;
    const border = document.getElementById('cardBorder').value;
    const hoverable = document.getElementById('cardHoverable').checked;
    const flippable = document.getElementById('cardFlippable').checked;
    const showMenu = document.getElementById('cardShowMenu').checked;
    const expandable = document.getElementById('cardExpandable').checked;
    
    const menuItems = showMenu ? `[{"id":"edit","label":"Edit","icon":"✏️"},{"id":"expand","label":"${expandable ? 'Expand' : 'Toggle'}","icon":"⇱"},{"id":"delete","label":"Delete","icon":"🗑️"}]` : '[]';
    
    const cardContainer = document.getElementById('interactiveCardContainer');
    if (cardContainer) {
      cardContainer.innerHTML = `
        <ui-card 
          variant="${variant}"
          width="${width}"
          border-radius="${borderRadius}"
          border="${border}"
          ${hoverable ? 'hoverable="true"' : ''}
          ${flippable ? 'flippable="true"' : ''}
          ${showMenu ? 'show-menu="true"' : ''}
          ${expandable ? 'expandable="true"' : ''}
          menu-items='${menuItems}'>
          <div slot="header">
            <h3 style="margin: 0; font-size: 18px; color: #1f2937;">Interactive Card</h3>
          </div>
          <div slot="content">
            <p style="margin: 0 0 12px; color: #6b7280;">This is an interactive card where you can customize various properties in real-time.</p>
            <p style="margin: 0; color: #9ca3af; font-size: 14px;">Try different variants, make it hoverable, or enable flipping!</p>
          </div>
          <div slot="footer">
            <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Action Button</button>
          </div>
          ${flippable ? `
            <div slot="back">
              <div style="padding: 20px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;">
                <h3 style="margin: 0 0 12px;">Back Side</h3>
                <p style="margin: 0; text-align: center;">This is the back of the flippable card. Click to flip back!</p>
              </div>
            </div>
          ` : ''}
        </ui-card>
      `;
    }
  };
}
