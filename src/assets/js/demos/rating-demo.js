// Component Demo Functions
export function initRatingDemo() {
  const section = document.getElementById('rating');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">⭐ Rating Component</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Interactive rating component with stars, smileys, and thumbs.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showStarRating()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Star Rating</button>
      <button onclick="showSmileyRating()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Smiley Rating</button>
      <button onclick="showThumbRating()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Thumb Rating</button>
      <button onclick="showCustomRating()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Custom</button>
      <button onclick="showInteractiveRating()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Interactive Playground</button>
    </div>

    <div id="ratingDemoContainer" style="margin-top: 20px;"></div>
  `;

  // Initialize with star rating
  setTimeout(() => {
    // Rating Demo Functions
    window.showStarRating = function() {
    const container = document.getElementById('ratingDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Basic Star Rating</h4>
          <ui-rating type="star" max="5" value="3"></ui-rating>
        </div>
        <div>
          <h4>Half Star Ratings</h4>
          <ui-rating type="star" max="5" value="3.5" allow-half="true" show-value="true"></ui-rating>
        </div>
        <div>
          <h4>With Value Display</h4>
          <ui-rating type="star" max="5" value="4" show-value="true"></ui-rating>
        </div>
        <div>
          <h4>With Custom Labels</h4>
          <ui-rating 
            id="starLabels"
            type="star" 
            max="5" 
            value="0"
            show-value="true">
          </ui-rating>
          <p style="margin-top: 10px; color: #6b7280; font-size: 14px;" id="starRatingText">Click to rate</p>
        </div>
      </div>
    `;
    setTimeout(() => {
      const rating = document.getElementById('starLabels');
      if (rating) {
        rating.labels = JSON.stringify(['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']);
        rating.addEventListener('ratingChange', (e) => {
          const text = document.getElementById('starRatingText');
          if (text) {
            text.textContent = e.detail > 0 ? `You rated: ${e.detail} star${e.detail !== 1 ? 's' : ''}` : 'Click to rate';
          }
        });
      }
    }, 100);
  };

  window.showSmileyRating = function() {
    const container = document.getElementById('ratingDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Basic Smiley Rating</h4>
          <ui-rating type="smiley" max="5" value="0"></ui-rating>
        </div>
        <div>
          <h4>Smiley with Labels</h4>
          <ui-rating 
            id="smileyLabels"
            type="smiley" 
            max="5" 
            value="0">
          </ui-rating>
        </div>
        <div>
          <h4>Customer Satisfaction</h4>
          <ui-rating 
            id="satisfaction"
            type="smiley" 
            max="5" 
            value="0"
            show-value="true">
          </ui-rating>
          <p style="margin-top: 10px; color: #6b7280; font-size: 14px;" id="satisfactionText">How was your experience?</p>
        </div>
      </div>
    `;
    setTimeout(() => {
      const smiley1 = document.getElementById('smileyLabels');
      const smiley2 = document.getElementById('satisfaction');
      if (smiley1) {
        smiley1.labels = JSON.stringify(['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']);
      }
      if (smiley2) {
        smiley2.labels = JSON.stringify(['Very Poor', 'Poor', 'Average', 'Good', 'Excellent']);
        smiley2.addEventListener('ratingChange', (e) => {
          const text = document.getElementById('satisfactionText');
          const labels = ['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'];
          if (text) {
            text.textContent = e.detail > 0 ? `Your rating: ${labels[e.detail]}` : 'How was your experience?';
          }
        });
      }
    }, 100);
  };

  window.showThumbRating = function() {
    const container = document.getElementById('ratingDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Basic Thumbs Rating</h4>
          <ui-rating type="thumb" value="0"></ui-rating>
        </div>
        <div>
          <h4>Was this helpful?</h4>
          <ui-rating id="helpfulThumb" type="thumb" value="0" size="lg"></ui-rating>
          <p style="margin-top: 10px; color: #6b7280; font-size: 14px;" id="thumbText">Let us know!</p>
        </div>
        <div>
          <h4>Different Sizes</h4>
          <div style="display: flex; gap: 30px; align-items: center;">
            <div style="text-align: center;">
              <ui-rating type="thumb" size="sm"></ui-rating>
              <p style="margin-top: 5px; font-size: 12px; color: #6b7280;">Small</p>
            </div>
            <div style="text-align: center;">
              <ui-rating type="thumb" size="md"></ui-rating>
              <p style="margin-top: 5px; font-size: 12px; color: #6b7280;">Medium</p>
            </div>
            <div style="text-align: center;">
              <ui-rating type="thumb" size="lg"></ui-rating>
              <p style="margin-top: 5px; font-size: 12px; color: #6b7280;">Large</p>
            </div>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const thumb = document.getElementById('helpfulThumb');
      if (thumb) {
        thumb.addEventListener('ratingChange', (e) => {
          const text = document.getElementById('thumbText');
          if (text) {
            if (e.detail === 1) text.textContent = '👍 Glad it helped!';
            else if (e.detail === -1) text.textContent = '👎 Sorry to hear that';
            else text.textContent = 'Let us know!';
          }
        });
      }
    }, 100);
  };

  window.showRatingSizes = function() {
    const container = document.getElementById('ratingDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Small Size</h4>
          <div style="display: flex; gap: 30px; align-items: center; flex-wrap: wrap;">
            <ui-rating type="star" size="sm" value="4"></ui-rating>
            <ui-rating type="smiley" size="sm" value="3"></ui-rating>
            <ui-rating type="thumb" size="sm" value="1"></ui-rating>
          </div>
        </div>
        <div>
          <h4>Medium Size (Default)</h4>
          <div style="display: flex; gap: 30px; align-items: center; flex-wrap: wrap;">
            <ui-rating type="star" size="md" value="4"></ui-rating>
            <ui-rating type="smiley" size="md" value="3"></ui-rating>
            <ui-rating type="thumb" size="md" value="1"></ui-rating>
          </div>
        </div>
        <div>
          <h4>Large Size</h4>
          <div style="display: flex; gap: 30px; align-items: center; flex-wrap: wrap;">
            <ui-rating type="star" size="lg" value="4"></ui-rating>
            <ui-rating type="smiley" size="lg" value="3"></ui-rating>
            <ui-rating type="thumb" size="lg" value="1"></ui-rating>
          </div>
        </div>
      </div>
    `;
  };

  window.showRatingColors = function() {
    const container = document.getElementById('ratingDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h4>Primary</h4>
          <ui-rating type="star" color="primary" value="4"></ui-rating>
        </div>
        <div>
          <h4>Warning (Default)</h4>
          <ui-rating type="star" color="warning" value="4"></ui-rating>
        </div>
        <div>
          <h4>Success</h4>
          <ui-rating type="star" color="success" value="4"></ui-rating>
        </div>
        <div>
          <h4>Danger</h4>
          <ui-rating type="star" color="danger" value="4"></ui-rating>
        </div>
      </div>
    `;
  };

  window.showRatingStates = function() {
    const container = document.getElementById('ratingDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h4>Interactive (Default)</h4>
          <ui-rating type="star" max="5" value="0"></ui-rating>
          <p style="margin-top: 10px; color: #6b7280; font-size: 14px;">Click to rate</p>
        </div>
        <div>
          <h4>Read-only</h4>
          <ui-rating type="star" max="5" value="4" readonly="true" show-value="true"></ui-rating>
          <p style="margin-top: 10px; color: #6b7280; font-size: 14px;">Cannot be changed</p>
        </div>
        <div>
          <h4>Disabled</h4>
          <ui-rating type="star" max="5" value="3" disabled="true"></ui-rating>
          <p style="margin-top: 10px; color: #6b7280; font-size: 14px;">Disabled state</p>
        </div>
        <div>
          <h4>Read-only Smiley</h4>
          <ui-rating id="readonlySmiley" type="smiley" max="5" value="5" readonly="true"></ui-rating>
        </div>
        <div>
          <h4>Disabled Thumbs</h4>
          <ui-rating type="thumb" value="1" disabled="true"></ui-rating>
        </div>
      </div>
    `;
    setTimeout(() => {
      const smiley = document.getElementById('readonlySmiley');
      if (smiley) {
        smiley.labels = JSON.stringify(['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']);
      }
    }, 100);
  };

  showStarRating();
  }, 100);

  // Interactive Playground
  window.showInteractiveRating = function() {
    const container = document.getElementById('ratingDemoContainer');
    if (!container) return;
    
    container.innerHTML = `
      <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; gap: 30px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 250px;">
            <h3>🎮 Interactive Playground</h3>
            <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Type:</label>
                <select id="ratingType" onchange="updateInteractiveRating()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="star">Star</option>
                  <option value="smiley">Smiley</option>
                  <option value="thumb">Thumb</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Value:</label>
                <input type="number" id="ratingValue" value="3" min="0" max="5" step="0.5" onchange="updateInteractiveRating()"
                  style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Max (Star/Smiley only):</label>
                <input type="number" id="ratingMax" value="5" min="1" max="10" onchange="updateInteractiveRating()"
                  style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Size:</label>
                <select id="ratingSize" onchange="updateInteractiveRating()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Color:</label>
                <select id="ratingColor" onchange="updateInteractiveRating()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">
                  <option value="primary">Primary</option>
                  <option value="warning" selected>Warning</option>
                  <option value="success">Success</option>
                  <option value="danger">Danger</option>
                </select>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="ratingAllowHalf" onchange="updateInteractiveRating()" style="cursor: pointer;">
                <label for="ratingAllowHalf" style="cursor: pointer;">Allow Half Ratings (Star only)</label>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="ratingShowValue" onchange="updateInteractiveRating()" style="cursor: pointer;">
                <label for="ratingShowValue" style="cursor: pointer;">Show Value</label>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="ratingReadonly" onchange="updateInteractiveRating()" style="cursor: pointer;">
                <label for="ratingReadonly" style="cursor: pointer;">Read Only</label>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="ratingDisabled" onchange="updateInteractiveRating()" style="cursor: pointer;">
                <label for="ratingDisabled" style="cursor: pointer;">Disabled</label>
              </div>
            </div>
          </div>
          
          <div style="flex: 1; min-width: 250px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h4 style="margin-top: 0;">Preview:</h4>
            <div id="interactiveRatingContainer" style="margin-top: 20px;"></div>
            <div id="ratingOutput" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px; display: none;"></div>
          </div>
        </div>
      </div>
    `;
    
    updateInteractiveRating();
  };

  window.updateInteractiveRating = function() {
    const type = document.getElementById('ratingType').value;
    const value = parseFloat(document.getElementById('ratingValue').value);
    const max = parseInt(document.getElementById('ratingMax').value);
    const size = document.getElementById('ratingSize').value;
    const color = document.getElementById('ratingColor').value;
    const allowHalf = document.getElementById('ratingAllowHalf').checked;
    const showValue = document.getElementById('ratingShowValue').checked;
    const readonly = document.getElementById('ratingReadonly').checked;
    const disabled = document.getElementById('ratingDisabled').checked;
    
    const container = document.getElementById('interactiveRatingContainer');
    const outputDiv = document.getElementById('ratingOutput');
    
    if (!container) return;
    
    container.innerHTML = `
      <ui-rating
        id="interactiveRatingComponent"
        type="${type}"
        value="${value}"
        max="${max}"
        size="${size}"
        color="${color}"
        ${allowHalf ? 'allow-half="true"' : ''}
        ${showValue ? 'show-value="true"' : ''}
        ${readonly ? 'readonly="true"' : ''}
        ${disabled ? 'disabled="true"' : ''}
      ></ui-rating>
    `;
    
    // Add event listener for rating change
    setTimeout(() => {
      const ratingComponent = document.getElementById('interactiveRatingComponent');
      if (ratingComponent) {
        ratingComponent.addEventListener('ratingChange', (event) => {
          outputDiv.style.display = 'block';
          outputDiv.textContent = `Rating changed to: ${event.detail}`;
          document.getElementById('ratingValue').value = event.detail;
        });
      }
    }, 100);
  };
}
