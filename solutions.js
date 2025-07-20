document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.category-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const category = button.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
        });
    });
    
    // Solution cards hover effect
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('img').style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
    // Action plan functionality
    const actionOptionsContainer = document.getElementById('action-options');
    const selectedActionsList = document.getElementById('selected-actions');
    const savePlanButton = document.getElementById('save-plan');
    
    // Sample action options (in a real app, these would come from a database)
    const actionOptions = [
        {
            id: 'transport-1',
            category: 'transportation',
            title: 'Use public transportation 3+ days/week',
            description: 'Replace car commutes with buses or trains'
        },
        {
            id: 'transport-2',
            category: 'transportation',
            title: 'Bike or walk for short trips',
            description: 'For trips under 2 miles, avoid using the car'
        },
        {
            id: 'energy-1',
            category: 'energy',
            title: 'Switch to LED bulbs',
            description: 'Replace all incandescent bulbs with LEDs'
        },
        {
            id: 'energy-2',
            category: 'energy',
            title: 'Lower thermostat by 2°F in winter',
            description: 'Small adjustments can save significant energy'
        },
        {
            id: 'food-1',
            category: 'food',
            title: 'Meatless Mondays',
            description: 'Go vegetarian one day per week'
        },
        {
            id: 'food-2',
            category: 'food',
            title: 'Buy local produce',
            description: 'Reduce food miles by shopping at farmers markets'
        },
        {
            id: 'shopping-1',
            category: 'shopping',
            title: 'Bring reusable bags',
            description: 'Avoid single-use plastic bags when shopping'
        },
        {
            id: 'shopping-2',
            category: 'shopping',
            title: 'Buy second-hand clothing',
            description: 'Reduce demand for new clothing production'
        }
    ];
    
    // Populate action options
    function populateActionOptions() {
        actionOptionsContainer.innerHTML = '';
        
        actionOptions.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'action-option';
            optionElement.innerHTML = `
                <input type="checkbox" id="opt-${option.id}" data-id="${option.id}">
                <div class="action-option-label">
                    <h4>${option.title}</h4>
                    <p>${option.description}</p>
                </div>
            `;
            
            const checkbox = optionElement.querySelector('input');
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    addToActionPlan(option);
                } else {
                    removeFromActionPlan(option.id);
                }
            });
            
            actionOptionsContainer.appendChild(optionElement);
        });
    }
    
    // Add action to plan
    function addToActionPlan(action) {
        // Remove empty state if present
        if (selectedActionsList.querySelector('.empty-state')) {
            selectedActionsList.innerHTML = '';
        }
        
        const li = document.createElement('li');
        li.setAttribute('data-id', action.id);
        li.innerHTML = `
            <span>${action.title}</span>
            <button class="remove-btn" data-id="${action.id}">×</button>
        `;
        
        selectedActionsList.appendChild(li);
        
        // Add remove button event
        li.querySelector('.remove-btn').addEventListener('click', function() {
            removeFromActionPlan(action.id);
            // Uncheck the corresponding checkbox
            document.getElementById(`opt-${action.id}`).checked = false;
        });
    }
    
    // Remove action from plan
    function removeFromActionPlan(actionId) {
        const itemToRemove = selectedActionsList.querySelector(`[data-id="${actionId}"]`);
        if (itemToRemove) {
            itemToRemove.remove();
        }
        
        // Show empty state if no actions left
        if (selectedActionsList.children.length === 0) {
            selectedActionsList.innerHTML = '<li class="empty-state">Select actions from the left to build your plan</li>';
        }
    }
    
    // Save action plan
    savePlanButton.addEventListener('click', function() {
        const selectedActions = Array.from(selectedActionsList.children)
            .filter(li => !li.classList.contains('empty-state'))
            .map(li => li.getAttribute('data-id'));
        
        if (selectedActions.length === 0) {
            alert('Please select at least one action to save your plan');
            return;
        }
        
        // In a real app, this would save to a database
        localStorage.setItem('ecoActionPlan', JSON.stringify(selectedActions));
        
        // Show success message
        alert('Your action plan has been saved! You can view and update it anytime.');
    });
    
    // Load saved plan if exists
    function loadSavedPlan() {
        const savedPlan = localStorage.getItem('ecoActionPlan');
        if (savedPlan) {
            const selectedActionIds = JSON.parse(savedPlan);
            
            selectedActionIds.forEach(id => {
                const action = actionOptions.find(opt => opt.id === id);
                if (action) {
                    addToActionPlan(action);
                    // Check the corresponding checkbox
                    document.getElementById(`opt-${id}`).checked = true;
                }
            });
        }
    }
    
    // Initialize
    populateActionOptions();
    loadSavedPlan();
});