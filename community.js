document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    function initMap() {
        // Default to center of US if no geolocation
        const defaultCenter = { lat: 37.0902, lng: -95.7129 };
        
        // Try to get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    createMap(userLocation);
                },
                () => {
                    createMap(defaultCenter);
                }
            );
        } else {
            createMap(defaultCenter);
        }
    }
    
    function createMap(center) {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: center,
            zoom: 10,
            styles: [
                {
                    featureType: "poi",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });
        
        // Add marker for user's location
        new google.maps.Marker({
            position: center,
            map: map,
            title: "Your Location",
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
        });
        
        // Sample environmental groups (in a real app, these would come from a database)
        const environmentalGroups = [
            {
                name: "Green City Initiative",
                type: "advocacy",
                location: { lat: center.lat + 0.05, lng: center.lng + 0.02 },
                description: "Advocating for sustainable urban policies",
                contact: "info@greencity.org",
                members: 120
            },
            {
                name: "Clean Rivers Alliance",
                type: "cleanup",
                location: { lat: center.lat - 0.03, lng: center.lng - 0.04 },
                description: "Organizing river cleanups and water quality monitoring",
                contact: "contact@cleanrivers.org",
                members: 85
            },
            {
                name: "Climate Education Network",
                type: "education",
                location: { lat: center.lat + 0.02, lng: center.lng - 0.03 },
                description: "Providing climate education in schools",
                contact: "education@climatenet.org",
                members: 65
            },
            {
                name: "Urban Garden Collective",
                type: "urban-gardening",
                location: { lat: center.lat - 0.01, lng: center.lng + 0.05 },
                description: "Creating community gardens in urban areas",
                contact: "grow@urbangarden.org",
                members: 200
            }
        ];
        
        // Add markers for groups
        environmentalGroups.forEach(group => {
            const marker = new google.maps.Marker({
                position: group.location,
                map: map,
                title: group.name,
                icon: {
                    url: getIconForGroupType(group.type),
                    scaledSize: new google.maps.Size(30, 30)
                }
            });
            
            // Add info window
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div class="map-info-window">
                        <h3>${group.name}</h3>
                        <p>${group.description}</p>
                        <p><strong>Contact:</strong> ${group.contact}</p>
                        <p><strong>Members:</strong> ${group.members}</p>
                    </div>
                `
            });
            
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        });
        
        // Populate group list
        populateGroupList(environmentalGroups);
        
        // Search functionality
        const searchBox = new google.maps.places.SearchBox(
            document.getElementById('location-search')
        );
        
        document.getElementById('search-btn').addEventListener('click', () => {
            const places = searchBox.getPlaces();
            if (places.length > 0) {
                map.setCenter(places[0].geometry.location);
                map.setZoom(12);
            }
        });
        
        // Filter functionality
        document.getElementById('group-type').addEventListener('change', function() {
            const selectedType = this.value;
            const filteredGroups = selectedType === 'all' 
                ? environmentalGroups 
                : environmentalGroups.filter(group => group.type === selectedType);
            
            populateGroupList(filteredGroups);
        });
    }
    
    function getIconForGroupType(type) {
        const icons = {
            'advocacy': 'images/advocacy-icon.png',
            'cleanup': 'images/cleanup-icon.png',
            'education': 'images/education-icon.png',
            'urban-gardening': 'images/gardening-icon.png',
            'policy': 'images/policy-icon.png'
        };
        return icons[type] || 'images/default-icon.png';
    }
    
    function populateGroupList(groups) {
        const groupList = document.getElementById('group-list');
        groupList.innerHTML = '';
        
        if (groups.length === 0) {
            groupList.innerHTML = '<div class="empty-state">No groups found matching your criteria</div>';
            return;
        }
        
        groups.forEach(group => {
            const groupCard = document.createElement('div');
            groupCard.className = 'group-card';
            groupCard.innerHTML = `
                <div class="group-header">
                    <img src="${getIconForGroupType(group.type)}" alt="${group.name}" class="group-avatar">
                    <div class="group-info">
                        <h3>${group.name}</h3>
                        <p>${group.description}</p>
                    </div>
                </div>
                <div class="group-details">
                    <div class="group-detail-item">
                        <span>Type:</span>
                        <span class="group-type">${formatGroupType(group.type)}</span>
                    </div>
                    <div class="group-detail-item">
                        <span>Members:</span>
                        <span>${group.members}</span>
                    </div>
                    <div class="group-detail-item">
                        <span>Contact:</span>
                        <span>${group.contact}</span>
                    </div>
                </div>
                <div class="group-actions">
                    <button class="join-btn">Join Group</button>
                    <button class="learn-more-btn">Learn More</button>
                </div>
            `;
            
            groupList.appendChild(groupCard);
        });
    }
    
    function formatGroupType(type) {
        const types = {
            'advocacy': 'Advocacy',
            'cleanup': 'Cleanup',
            'education': 'Education',
            'urban-gardening': 'Urban Gardening',
            'policy': 'Policy'
        };
        return types[type] || type;
    }
    
    // Initialize map when Google Maps API is loaded
    window.initMap = initMap;
    
    // Sample events data (in a real app, these would come from a database)
    const events = [
        {
            id: 1,
            title: "Community Park Cleanup",
            type: "cleanup",
            date: "2023-10-15",
            time: "9:00 AM",
            location: "Central Park",
            description: "Join us for a morning of cleaning up our local park. Gloves and bags provided.",
            image: "images/cleanup-event.jpg"
        },
        {
            id: 2,
            title: "Climate Policy Workshop",
            type: "workshop",
            date: "2023-10-20",
            time: "6:30 PM",
            location: "Community Center",
            description: "Learn how to effectively advocate for climate policies at the local level.",
            image: "images/workshop-event.jpg"
        },
        {
            id: 3,
            title: "March for Climate Action",
            type: "protest",
            date: "2023-11-05",
            time: "12:00 PM",
            location: "City Hall",
            description: "Peaceful march to demand stronger climate action from our local government.",
            image: "images/march-event.jpg"
        },
        {
            id: 4,
            title: "Sustainable Living Fair",
            type: "meeting",
            date: "2023-11-12",
            time: "10:00 AM - 4:00 PM",
            location: "Downtown Plaza",
            description: "Exhibits and workshops on sustainable living practices for urban dwellers.",
            image: "images/fair-event.jpg"
        },
        {
            id: 5,
            title: "Tree Planting Day",
            type: "cleanup",
            date: "2023-11-18",
            time: "8:00 AM",
            location: "Riverside Area",
            description: "Help us plant 100 native trees along the riverbank to prevent erosion.",
            image: "images/tree-event.jpg"
        },
        {
            id: 6,
            title: "Fundraiser Dinner",
            type: "fundraiser",
            date: "2023-12-03",
            time: "7:00 PM",
            location: "Green Earth Restaurant",
            description: "Vegan dinner fundraiser for our urban farming initiative.",
            image: "images/fundraiser-event.jpg"
        }
    ];
    
    // Populate events
    function populateEvents(filteredEvents = events) {
        const eventsGrid = document.getElementById('events-grid');
        eventsGrid.innerHTML = '';
        
        if (filteredEvents.length === 0) {
            eventsGrid.innerHTML = '<div class="empty-state">No events found matching your criteria</div>';
            return;
        }
        
        filteredEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-image" style="background-image: url('${event.image}')">
                    <div class="event-date">${formatDate(event.date)}</div>
                </div>
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <div class="event-meta">
                        <span>${event.time}</span>
                        <span>${event.location}</span>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-actions">
                        <span class="event-type">${formatEventType(event.type)}</span>
                        <button class="rsvp-btn">RSVP</button>
                    </div>
                </div>
            `;
            
            eventsGrid.appendChild(eventCard);
        });
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    
    function formatEventType(type) {
        const types = {
            'cleanup': 'Cleanup',
            'protest': 'Protest/March',
            'workshop': 'Workshop',
            'meeting': 'Meeting',
            'fundraiser': 'Fundraiser'
        };
        return types[type] || type;
    }
    
    // Event filters
    function applyEventFilters() {
        const typeFilter = document.getElementById('event-type').value;
        const distanceFilter = document.getElementById('event-distance').value;
        const dateFilter = document.getElementById('event-date').value;
        
        let filteredEvents = events;
        
        // Filter by type
        if (typeFilter !== 'all') {
            filteredEvents = filteredEvents.filter(event => event.type === typeFilter);
        }
        
        // Filter by date (in a real app, this would use actual dates)
        if (dateFilter !== 'all') {
            filteredEvents = filteredEvents.slice(0, 3); // Just for demo
        }
        
        populateEvents(filteredEvents);
    }
    
    // Initialize events
    populateEvents();
    
    // Set up filter event listeners
    document.getElementById('event-type').addEventListener('change', applyEventFilters);
    document.getElementById('event-distance').addEventListener('change', applyEventFilters);
    document.getElementById('event-date').addEventListener('change', applyEventFilters);
    
    // Forum functionality
    const topicList = document.getElementById('topic-list');
    const postsContainer = document.getElementById('posts-container');
    const selectedTopicTitle = document.getElementById('selected-topic-title');
    const newTopicBtn = document.getElementById('new-topic-btn');
    const newPostForm = document.getElementById('new-post-form');
    const submitPostBtn = document.getElementById('submit-post');
    
    // Sample forum data (in a real app, this would come from a database)
    const forumData = [
        {
            id: 1,
            title: "Best ways to reduce home energy use?",
            author: "EcoHomeowner",
            date: "2023-09-10",
            posts: [
                {
                    author: "EcoHomeowner",
                    avatar: "images/user1.jpg",
                    date: "2023-09-10",
                    content: "I'm looking for practical ways to reduce my home energy consumption beyond just turning off lights. Any suggestions?"
                },
                {
                    author: "GreenThumb",
                    avatar: "images/user2.jpg",
                    date: "2023-09-11",
                    content: "A smart thermostat made a big difference for me! Also, insulating my attic helped reduce heating costs in winter."
                },
                {
                    author: "SolarFan",
                    avatar: "images/user3.jpg",
                    date: "2023-09-12",
                    content: "If you can afford it, solar panels are a great investment. Many areas have incentives that make it more affordable."
                }
            ]
        },
        {
            id: 2,
            title: "Local climate action groups in our area",
            author: "CommunityBuilder",
            date: "2023-09-05",
            posts: [
                {
                    author: "CommunityBuilder",
                    avatar: "images/user4.jpg",
                    date: "2023-09-05",
                    content: "I'm trying to compile a list of active climate action groups in our region. Please share any you know about!"
                },
                {
                    author: "Activist123",
                    avatar: "images/user5.jpg",
                    date: "2023-09-06",
                    content: "The Sunrise Movement has a local chapter that meets every Wednesday at the community center."
                }
            ]
        },
        {
            id: 3,
            title: "Vegetarian recipes that meat-eaters will enjoy",
            author: "PlantBased",
            date: "2023-08-28",
            posts: [
                {
                    author: "PlantBased",
                    avatar: "images/user6.jpg",
                    date: "2023-08-28",
                    content: "I'm trying to reduce my family's meat consumption but need recipes that will satisfy my meat-loving spouse. Any favorites?"
                },
                {
                    author: "VeggieChef",
                    avatar: "images/user7.jpg",
                    date: "2023-08-29",
                    content: "Lentil shepherd's pie is always a hit! The texture is hearty enough to satisfy meat cravings."
                },
                {
                    author: "Flexitarian",
                    avatar: "images/user8.jpg",
                    date: "2023-08-30",
                    content: "Mushroom burgers with all the traditional toppings work well for my family. The umami flavor helps."
                }
            ]
        }
    ];
    
    // Populate topic list
    function populateTopicList() {
        topicList.innerHTML = '';
        
        forumData.forEach(topic => {
            const topicItem = document.createElement('li');
            topicItem.className = 'topic-item';
            topicItem.setAttribute('data-id', topic.id);
            topicItem.innerHTML = `
                <h4>${topic.title}</h4>
                <div class="topic-meta">
                    <span>By ${topic.author}</span>
                    <span>${formatDate(topic.date)}</span>
                </div>
                <div class="topic-meta">
                    <span>${topic.posts.length} replies</span>
                </div>
            `;
            
            topicItem.addEventListener('click', () => showTopicPosts(topic.id));
            
            topicList.appendChild(topicItem);
        });
    }
    
    // Show posts for a topic
    function showTopicPosts(topicId) {
        const topic = forumData.find(t => t.id == topicId);
        if (!topic) return;
        
        selectedTopicTitle.textContent = topic.title;
        postsContainer.innerHTML = '';
        
        topic.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <div class="post-header">
                    <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
                    <div>
                        <div class="post-author">${post.author}</div>
                        <div class="post-date">${formatDate(post.date)}</div>
                    </div>
                </div>
                <div class="post-content">
                    ${post.content}
                </div>
            `;
            
            postsContainer.appendChild(postElement);
        });
        
        // Show reply form
        newPostForm.classList.remove('hidden');
    }
    
    // New topic button
    newTopicBtn.addEventListener('click', () => {
        alert('In a complete implementation, this would open a form to create a new discussion topic.');
    });
    
    // Submit post
    submitPostBtn.addEventListener('click', () => {
        const textarea = newPostForm.querySelector('textarea');
        if (textarea.value.trim() === '') {
            alert('Please enter your reply before posting.');
            return;
        }
        
        alert('In a complete implementation, this would submit your reply to the server.');
        textarea.value = '';
    });
    
    // Initialize forum
    populateTopicList();
});