// Advanced Data Table Demo Functions
export function initAdvancedDataTableDemo() {
  const section = document.getElementById('advanced-data-table');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="margin: 0;">📊 Advanced Data Table</h2>
      <button onclick="showSection('home')"
        style="background-color: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">←
        Back to Home</button>
    </div>
    <p>Feature-rich data table with sorting, filtering, resizing, grouping, and more.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="showBasicTable()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Basic</button>
      <button onclick="showSkeletonLoading()" style="padding: 8px 16px; background-color: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer;">Skeleton Loading</button>
      <button onclick="showColumnGrouping()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">Column Grouping</button>
      <button onclick="showRowGrouping()" style="padding: 8px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Row Grouping</button>
      <button onclick="showInputTypes()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">Input Types</button>
      <button onclick="showTableWithSelection()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Selection</button>
      <button onclick="showRowActions()" style="padding: 8px 16px; background-color: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;">Row Actions</button>
      <button onclick="showEditableTable()" style="padding: 8px 16px; background-color: #f97316; color: white; border: none; border-radius: 6px; cursor: pointer;">Editable Mode</button>
      <button onclick="showColumnPinning()" style="padding: 8px 16px; background-color: #7c3aed; color: white; border: none; border-radius: 6px; cursor: pointer;">📌 Column Pinning</button>
      <button onclick="showRowPinning()" style="padding: 8px 16px; background-color: #db2777; color: white; border: none; border-radius: 6px; cursor: pointer;">📍 Row Pinning</button>
      <button onclick="showRowReordering()" style="padding: 8px 16px; background-color: #059669; color: white; border: none; border-radius: 6px; cursor: pointer;">↕️ Row Reorder</button>
      <button onclick="showMultiFilter()" style="padding: 8px 16px; background-color: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer;">🔍 Multi-Filter</button>
      <button onclick="showSearchMultiFilterPanel()" style="padding: 8px 16px; background-color: #0ea5e9; color: white; border: none; border-radius: 6px; cursor: pointer;">🔎 Search + Multi-Filter Panel</button>
      <button onclick="showEditEvents()" style="padding: 8px 16px; background-color: #ea580c; color: white; border: none; border-radius: 6px; cursor: pointer;">📡 Edit Events</button>
      <button onclick="showAdvancedPanels()" style="padding: 8px 16px; background-color: #0891b2; color: white; border: none; border-radius: 6px; cursor: pointer;">🎛️ Panels</button>
      <button onclick="showInteractiveTable()" style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">🎮 Playground</button>
    </div>

    <div id="tableDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    const tableContainer = document.getElementById('tableDemoContainer');
    if (!tableContainer) return;

    const sampleData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', website: 'https://johndoe.com', phone: '+1-555-0123', department: 'Engineering', role: 'Senior Developer', salary: 95000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2022-01-15', location: 'New York', manager: 'Sarah Connor', project: 'Phoenix', skillset: 'React, Node.js', experience: '8 years', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', website: 'https://janesmith.io', phone: '+1-555-0124', department: 'Marketing', role: 'Marketing Manager', salary: 85000, status: 'Active', rating: 5, active: true, verified: false, startDate: '2021-06-10', location: 'Los Angeles', manager: 'Mike Ross', project: 'Alpha', skillset: 'SEO, Analytics', experience: '6 years', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', website: 'https://bobjohnson.dev', phone: '+1-555-0125', department: 'Engineering', role: 'Team Lead', salary: 105000, status: 'Active', rating: 3, active: false, verified: true, startDate: '2020-03-22', location: 'San Francisco', manager: 'Sarah Connor', project: 'Phoenix', skillset: 'Python, AWS', experience: '10 years', avatar: 'https://i.pravatar.cc/150?img=8' },
      { id: 4, name: 'Alice Williams', email: 'alice@example.com', website: 'https://alice.dev', phone: '+1-555-0126', department: 'Sales', role: 'Sales Representative', salary: 70000, status: 'On Leave', rating: 4, active: true, verified: true, startDate: '2021-09-05', location: 'Chicago', manager: 'Tom Hardy', project: 'Beta', skillset: 'CRM, Negotiation', experience: '4 years', avatar: 'https://i.pravatar.cc/150?img=9' },
      { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', website: 'https://charlieb.com', phone: '+1-555-0127', department: 'Engineering', role: 'Junior Developer', salary: 65000, status: 'Active', rating: 5, active: true, verified: false, startDate: '2023-02-14', location: 'Austin', manager: 'Sarah Connor', project: 'Gamma', skillset: 'JavaScript, CSS', experience: '2 years', avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: 6, name: 'Diana Prince', email: 'diana@example.com', website: 'https://diana.io', phone: '+1-555-0128', department: 'HR', role: 'HR Manager', salary: 80000, status: 'Inactive', rating: 4, active: false, verified: true, startDate: '2019-11-20', location: 'Boston', manager: 'Bruce Wayne', project: 'Delta', skillset: 'Recruitment, Policy', experience: '7 years', avatar: 'https://i.pravatar.cc/150?img=20' },
      { id: 7, name: 'Ethan Hunt', email: 'ethan@example.com', website: 'https://ethanhunt.com', phone: '+1-555-0129', department: 'Marketing', role: 'Content Strategist', salary: 72000, status: 'Active', rating: 3, active: true, verified: true, startDate: '2022-07-08', location: 'Seattle', manager: 'Mike Ross', project: 'Alpha', skillset: 'Content, Copywriting', experience: '5 years', avatar: 'https://i.pravatar.cc/150?img=13' },
      { id: 8, name: 'Fiona Apple', email: 'fiona@example.com', website: 'https://fiona.dev', phone: '+1-555-0130', department: 'Sales', role: 'Account Executive', salary: 78000, status: 'Active', rating: 5, active: true, verified: false, startDate: '2021-12-01', location: 'Miami', manager: 'Tom Hardy', project: 'Beta', skillset: 'B2B Sales, Closing', experience: '6 years', avatar: 'https://i.pravatar.cc/150?img=23' },
      { id: 9, name: 'George Lucas', email: 'george@example.com', website: 'https://george.com', phone: '+1-555-0131', department: 'Engineering', role: 'Senior Developer', salary: 98000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2021-01-20', location: 'Portland', manager: 'Sarah Connor', project: 'Phoenix', skillset: 'Java, Spring', experience: '9 years', avatar: 'https://i.pravatar.cc/150?img=14' },
      { id: 10, name: 'Hannah Montana', email: 'hannah@example.com', website: 'https://hannah.io', phone: '+1-555-0132', department: 'Design', role: 'UX Designer', salary: 82000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2022-03-15', location: 'Denver', manager: 'Clark Kent', project: 'Omega', skillset: 'Figma, User Research', experience: '5 years', avatar: 'https://i.pravatar.cc/150?img=25' },
      { id: 11, name: 'Ian McKellen', email: 'ian@example.com', website: 'https://ian.dev', phone: '+1-555-0133', department: 'Engineering', role: 'DevOps Engineer', salary: 92000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2020-08-10', location: 'Phoenix', manager: 'Sarah Connor', project: 'Gamma', skillset: 'Docker, Kubernetes', experience: '7 years', avatar: 'https://i.pravatar.cc/150?img=15' },
      { id: 12, name: 'Julia Roberts', email: 'julia@example.com', website: 'https://julia.com', phone: '+1-555-0134', department: 'Marketing', role: 'Social Media Manager', salary: 68000, status: 'Active', rating: 4, active: true, verified: false, startDate: '2022-11-05', location: 'Nashville', manager: 'Mike Ross', project: 'Alpha', skillset: 'Social Media, Ads', experience: '4 years', avatar: 'https://i.pravatar.cc/150?img=26' },
      { id: 13, name: 'Kevin Hart', email: 'kevin@example.com', website: 'https://kevin.io', phone: '+1-555-0135', department: 'Sales', role: 'Sales Manager', salary: 88000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2019-05-12', location: 'Dallas', manager: 'Tom Hardy', project: 'Beta', skillset: 'Leadership, Strategy', experience: '10 years', avatar: 'https://i.pravatar.cc/150?img=16' },
      { id: 14, name: 'Laura Croft', email: 'laura@example.com', website: 'https://laura.dev', phone: '+1-555-0136', department: 'Engineering', role: 'QA Engineer', salary: 75000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2021-07-18', location: 'Atlanta', manager: 'Sarah Connor', project: 'Phoenix', skillset: 'Testing, Automation', experience: '5 years', avatar: 'https://i.pravatar.cc/150?img=27' },
      { id: 15, name: 'Michael Scott', email: 'michael@example.com', website: 'https://michael.com', phone: '+1-555-0137', department: 'Sales', role: 'Regional Manager', salary: 95000, status: 'Active', rating: 3, active: true, verified: true, startDate: '2018-02-01', location: 'Scranton', manager: 'David Wallace', project: 'Beta', skillset: 'Management, Sales', experience: '12 years', avatar: 'https://i.pravatar.cc/150?img=17' },
      { id: 16, name: 'Nancy Drew', email: 'nancy@example.com', website: 'https://nancy.io', phone: '+1-555-0138', department: 'HR', role: 'Recruiter', salary: 65000, status: 'Active', rating: 4, active: true, verified: false, startDate: '2023-01-10', location: 'Minneapolis', manager: 'Bruce Wayne', project: 'Delta', skillset: 'Sourcing, Interviews', experience: '3 years', avatar: 'https://i.pravatar.cc/150?img=28' },
      { id: 17, name: 'Oscar Martinez', email: 'oscar@example.com', website: 'https://oscar.dev', phone: '+1-555-0139', department: 'Finance', role: 'Accountant', salary: 72000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2020-06-22', location: 'Philadelphia', manager: 'Angela Martin', project: 'Sigma', skillset: 'Accounting, Excel', experience: '8 years', avatar: 'https://i.pravatar.cc/150?img=18' },
      { id: 18, name: 'Pam Beesly', email: 'pam@example.com', website: 'https://pam.com', phone: '+1-555-0140', department: 'Design', role: 'Graphic Designer', salary: 70000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2021-04-15', location: 'Scranton', manager: 'Clark Kent', project: 'Omega', skillset: 'Photoshop, Illustrator', experience: '6 years', avatar: 'https://i.pravatar.cc/150?img=29' },
      { id: 19, name: 'Quentin Tarantino', email: 'quentin@example.com', website: 'https://quentin.io', phone: '+1-555-0141', department: 'Engineering', role: 'Full Stack Developer', salary: 94000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2020-09-08', location: 'San Diego', manager: 'Sarah Connor', project: 'Phoenix', skillset: 'MERN, GraphQL', experience: '7 years', avatar: 'https://i.pravatar.cc/150?img=19' },
      { id: 20, name: 'Rachel Green', email: 'rachel@example.com', website: 'https://rachel.dev', phone: '+1-555-0142', department: 'Marketing', role: 'Brand Manager', salary: 79000, status: 'Active', rating: 4, active: true, verified: false, startDate: '2022-02-20', location: 'New York', manager: 'Mike Ross', project: 'Alpha', skillset: 'Branding, Strategy', experience: '5 years', avatar: 'https://i.pravatar.cc/150?img=30' },
      { id: 21, name: 'Steve Rogers', email: 'steve@example.com', website: 'https://steve.com', phone: '+1-555-0143', department: 'Engineering', role: 'Security Engineer', salary: 102000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2019-12-01', location: 'Washington DC', manager: 'Sarah Connor', project: 'Gamma', skillset: 'Security, Pentesting', experience: '9 years', avatar: 'https://i.pravatar.cc/150?img=21' },
      { id: 22, name: 'Tony Stark', email: 'tony@example.com', website: 'https://tony.io', phone: '+1-555-0144', department: 'Engineering', role: 'Tech Lead', salary: 115000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2018-05-15', location: 'Malibu', manager: 'Pepper Potts', project: 'Phoenix', skillset: 'AI, ML, IoT', experience: '15 years', avatar: 'https://i.pravatar.cc/150?img=22' },
      { id: 23, name: 'Uma Thurman', email: 'uma@example.com', website: 'https://uma.dev', phone: '+1-555-0145', department: 'Sales', role: 'Enterprise Sales', salary: 86000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2021-10-12', location: 'Las Vegas', manager: 'Tom Hardy', project: 'Beta', skillset: 'Enterprise, Contracts', experience: '7 years', avatar: 'https://i.pravatar.cc/150?img=31' },
      { id: 24, name: 'Victor Hugo', email: 'victor@example.com', website: 'https://victor.com', phone: '+1-555-0146', department: 'Design', role: 'UI Designer', salary: 76000, status: 'Active', rating: 4, active: true, verified: false, startDate: '2022-08-25', location: 'Portland', manager: 'Clark Kent', project: 'Omega', skillset: 'UI Design, Prototyping', experience: '4 years', avatar: 'https://i.pravatar.cc/150?img=32' },
      { id: 25, name: 'Wanda Vision', email: 'wanda@example.com', website: 'https://wanda.io', phone: '+1-555-0147', department: 'Engineering', role: 'Mobile Developer', salary: 89000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2020-11-30', location: 'Westview', manager: 'Sarah Connor', project: 'Gamma', skillset: 'React Native, Swift', experience: '6 years', avatar: 'https://i.pravatar.cc/150?img=33' },
      { id: 26, name: 'Xavier Charles', email: 'xavier@example.com', website: 'https://xavier.dev', phone: '+1-555-0148', department: 'HR', role: 'Training Manager', salary: 73000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2021-05-20', location: 'Salem', manager: 'Bruce Wayne', project: 'Delta', skillset: 'Training, L&D', experience: '5 years', avatar: 'https://i.pravatar.cc/150?img=34' },
      { id: 27, name: 'Yvonne Strahovski', email: 'yvonne@example.com', website: 'https://yvonne.com', phone: '+1-555-0149', department: 'Marketing', role: 'Email Marketing', salary: 64000, status: 'Active', rating: 4, active: true, verified: false, startDate: '2023-03-08', location: 'Tampa', manager: 'Mike Ross', project: 'Alpha', skillset: 'Mailchimp, Automation', experience: '3 years', avatar: 'https://i.pravatar.cc/150?img=35' },
      { id: 28, name: 'Zachary Levi', email: 'zachary@example.com', website: 'https://zachary.io', phone: '+1-555-0150', department: 'Engineering', role: 'Backend Developer', salary: 91000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2020-07-14', location: 'Baltimore', manager: 'Sarah Connor', project: 'Phoenix', skillset: 'Node.js, MongoDB', experience: '7 years', avatar: 'https://i.pravatar.cc/150?img=36' },
      { id: 29, name: 'Amy Adams', email: 'amy@example.com', website: 'https://amy.dev', phone: '+1-555-0151', department: 'Sales', role: 'Sales Operations', salary: 71000, status: 'On Leave', rating: 4, active: false, verified: true, startDate: '2022-04-18', location: 'Detroit', manager: 'Tom Hardy', project: 'Beta', skillset: 'Salesforce, Analytics', experience: '4 years', avatar: 'https://i.pravatar.cc/150?img=37' },
      { id: 30, name: 'Ben Affleck', email: 'ben@example.com', website: 'https://ben.com', phone: '+1-555-0152', department: 'Finance', role: 'Financial Analyst', salary: 77000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2021-09-22', location: 'Boston', manager: 'Angela Martin', project: 'Sigma', skillset: 'Finance, Modeling', experience: '6 years', avatar: 'https://i.pravatar.cc/150?img=38' },
      { id: 31, name: 'Cate Blanchett', email: 'cate@example.com', website: 'https://cate.io', phone: '+1-555-0153', department: 'Design', role: 'Creative Director', salary: 96000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2019-08-05', location: 'Los Angeles', manager: 'Clark Kent', project: 'Omega', skillset: 'Creative Strategy, Art', experience: '11 years', avatar: 'https://i.pravatar.cc/150?img=39' },
      { id: 32, name: 'Daniel Craig', email: 'daniel@example.com', website: 'https://daniel.dev', phone: '+1-555-0154', department: 'Engineering', role: 'Cloud Architect', salary: 108000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2019-03-12', location: 'London', manager: 'Sarah Connor', project: 'Phoenix', skillset: 'AWS, Azure, GCP', experience: '12 years', avatar: 'https://i.pravatar.cc/150?img=40' },
      { id: 33, name: 'Emma Stone', email: 'emma@example.com', website: 'https://emma.com', phone: '+1-555-0155', department: 'Marketing', role: 'PR Manager', salary: 81000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2021-11-18', location: 'New York', manager: 'Mike Ross', project: 'Alpha', skillset: 'PR, Media Relations', experience: '6 years', avatar: 'https://i.pravatar.cc/150?img=41' },
      { id: 34, name: 'Frank Sinatra', email: 'frank@example.com', website: 'https://frank.io', phone: '+1-555-0156', department: 'Sales', role: 'Channel Sales', salary: 74000, status: 'Active', rating: 4, active: true, verified: false, startDate: '2022-06-10', location: 'Las Vegas', manager: 'Tom Hardy', project: 'Beta', skillset: 'Partnerships, B2B', experience: '5 years', avatar: 'https://i.pravatar.cc/150?img=42' },
      { id: 35, name: 'Grace Kelly', email: 'grace@example.com', website: 'https://grace.dev', phone: '+1-555-0157', department: 'HR', role: 'HR Specialist', salary: 67000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2022-12-01', location: 'Monaco', manager: 'Bruce Wayne', project: 'Delta', skillset: 'HR Operations, Benefits', experience: '4 years', avatar: 'https://i.pravatar.cc/150?img=43' },
      { id: 36, name: 'Henry Cavill', email: 'henry@example.com', website: 'https://henry.com', phone: '+1-555-0158', department: 'Engineering', role: 'Data Engineer', salary: 97000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2020-10-08', location: 'London', manager: 'Sarah Connor', project: 'Gamma', skillset: 'ETL, Spark, SQL', experience: '8 years', avatar: 'https://i.pravatar.cc/150?img=44' },
      { id: 37, name: 'Isla Fisher', email: 'isla@example.com', website: 'https://isla.io', phone: '+1-555-0159', department: 'Design', role: 'Product Designer', salary: 84000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2021-02-14', location: 'Sydney', manager: 'Clark Kent', project: 'Omega', skillset: 'Product Design, UX', experience: '7 years', avatar: 'https://i.pravatar.cc/150?img=45' },
      { id: 38, name: 'Jake Gyllenhaal', email: 'jake@example.com', website: 'https://jake.dev', phone: '+1-555-0160', department: 'Engineering', role: 'Frontend Developer', salary: 87000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2021-08-20', location: 'San Francisco', manager: 'Sarah Connor', project: 'Phoenix', skillset: 'Vue.js, TypeScript', experience: '6 years', avatar: 'https://i.pravatar.cc/150?img=46' },
      { id: 39, name: 'Kate Winslet', email: 'kate@example.com', website: 'https://kate.com', phone: '+1-555-0161', department: 'Marketing', role: 'Marketing Analyst', salary: 69000, status: 'Active', rating: 4, active: true, verified: false, startDate: '2022-09-15', location: 'London', manager: 'Mike Ross', project: 'Alpha', skillset: 'Analytics, Reporting', experience: '5 years', avatar: 'https://i.pravatar.cc/150?img=47' },
      { id: 40, name: 'Leo DiCaprio', email: 'leo@example.com', website: 'https://leo.io', phone: '+1-555-0162', department: 'Sales', role: 'Business Development', salary: 83000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2020-12-10', location: 'Hollywood', manager: 'Tom Hardy', project: 'Beta', skillset: 'BD, Partnerships', experience: '8 years', avatar: 'https://i.pravatar.cc/150?img=48' },
      { id: 41, name: 'Morgan Freeman', email: 'morgan@example.com', website: 'https://morgan.dev', phone: '+1-555-0163', department: 'Engineering', role: 'Solutions Architect', salary: 112000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2018-07-01', location: 'Memphis', manager: 'Sarah Connor', project: 'Phoenix', skillset: 'Architecture, Design', experience: '14 years', avatar: 'https://i.pravatar.cc/150?img=49' },
      { id: 42, name: 'Natalie Portman', email: 'natalie@example.com', website: 'https://natalie.com', phone: '+1-555-0164', department: 'Design', role: 'Design Lead', salary: 93000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2020-04-22', location: 'Jerusalem', manager: 'Clark Kent', project: 'Omega', skillset: 'Leadership, Design', experience: '9 years', avatar: 'https://i.pravatar.cc/150?img=50' },
      { id: 43, name: 'Owen Wilson', email: 'owen@example.com', website: 'https://owen.io', phone: '+1-555-0165', department: 'Sales', role: 'Inside Sales Rep', salary: 66000, status: 'Active', rating: 3, active: true, verified: false, startDate: '2023-04-05', location: 'Dallas', manager: 'Tom Hardy', project: 'Beta', skillset: 'Cold Calling, Demos', experience: '2 years', avatar: 'https://i.pravatar.cc/150?img=51' },
      { id: 44, name: 'Penelope Cruz', email: 'penelope@example.com', website: 'https://penelope.dev', phone: '+1-555-0166', department: 'Marketing', role: 'Event Manager', salary: 75000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2021-12-20', location: 'Madrid', manager: 'Mike Ross', project: 'Alpha', skillset: 'Events, Coordination', experience: '6 years', avatar: 'https://i.pravatar.cc/150?img=52' },
      { id: 45, name: 'Quinn Fabray', email: 'quinn@example.com', website: 'https://quinn.com', phone: '+1-555-0167', department: 'HR', role: 'Benefits Coordinator', salary: 63000, status: 'Active', rating: 4, active: true, verified: true, startDate: '2022-10-12', location: 'Columbus', manager: 'Bruce Wayne', project: 'Delta', skillset: 'Benefits, Payroll', experience: '3 years', avatar: 'https://i.pravatar.cc/150?img=53' },
      { id: 46, name: 'Ryan Gosling', email: 'ryan@example.com', website: 'https://ryan.io', phone: '+1-555-0168', department: 'Engineering', role: 'ML Engineer', salary: 104000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2019-09-18', location: 'Toronto', manager: 'Sarah Connor', project: 'Gamma', skillset: 'ML, TensorFlow, PyTorch', experience: '10 years', avatar: 'https://i.pravatar.cc/150?img=54' },
      { id: 47, name: 'Scarlett Johansson', email: 'scarlett@example.com', website: 'https://scarlett.dev', phone: '+1-555-0169', department: 'Design', role: 'Interaction Designer', salary: 80000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2021-06-25', location: 'New York', manager: 'Clark Kent', project: 'Omega', skillset: 'Interaction, Motion', experience: '7 years', avatar: 'https://i.pravatar.cc/150?img=55' },
      { id: 48, name: 'Tom Hanks', email: 'tom@example.com', website: 'https://tom.com', phone: '+1-555-0170', department: 'Sales', role: 'Key Account Manager', salary: 90000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2019-11-08', location: 'Oakland', manager: 'Tom Hardy', project: 'Beta', skillset: 'Account Management', experience: '11 years', avatar: 'https://i.pravatar.cc/150?img=56' },
      { id: 49, name: 'Viola Davis', email: 'viola@example.com', website: 'https://viola.io', phone: '+1-555-0171', department: 'Finance', role: 'Controller', salary: 99000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2018-10-15', location: 'Providence', manager: 'Angela Martin', project: 'Sigma', skillset: 'Finance, Compliance', experience: '13 years', avatar: 'https://i.pravatar.cc/150?img=57' },
      { id: 50, name: 'Will Smith', email: 'will@example.com', website: 'https://will.dev', phone: '+1-555-0172', department: 'Engineering', role: 'Site Reliability Engineer', salary: 101000, status: 'Active', rating: 5, active: true, verified: true, startDate: '2019-06-30', location: 'Philadelphia', manager: 'Sarah Connor', project: 'Phoenix', skillset: 'SRE, Monitoring', experience: '9 years', avatar: 'https://i.pravatar.cc/150?img=58' }
    ];

    const columns = [
      { id: 'id', field: 'id', label: 'ID', sortable: true, width: '60px' },
      { id: 'name', field: 'name', label: 'Name', sortable: true, width: '150px' },
      { id: 'email', field: 'email', label: 'Email', sortable: true, width: '200px' },
      { id: 'phone', field: 'phone', label: 'Phone', sortable: true, width: '130px' },
      { id: 'department', field: 'department', label: 'Department', sortable: true, filterable: true, width: '120px' },
      { id: 'role', field: 'role', label: 'Role', sortable: true, width: '180px' },
      { id: 'salary', field: 'salary', label: 'Salary', sortable: true, width: '110px', format: function(value) { return '$' + value.toLocaleString(); } },
      { id: 'status', field: 'status', label: 'Status', sortable: true, filterable: true, width: '100px' },
      { id: 'location', field: 'location', label: 'Location', sortable: true, width: '150px' },
      { id: 'manager', field: 'manager', label: 'Manager', sortable: true, width: '140px' },
      { id: 'project', field: 'project', label: 'Project', sortable: true, filterable: true, width: '120px' },
      { id: 'skillset', field: 'skillset', label: 'Skills', sortable: false, width: '180px' },
      { id: 'experience', field: 'experience', label: 'Experience', sortable: true, width: '120px' },
      { id: 'startDate', field: 'startDate', label: 'Start Date', sortable: true, width: '120px' },
      { id: 'verified', field: 'verified', label: 'Verified', sortable: true, width: '90px', format: function(value) { return value ? '✓' : '✗'; } }
    ];

    window.showBasicTable = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>Basic Data Table - 50 Records with Scrolling</h3>
          <div style="overflow: auto; max-height: 600px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <ui-advanced-data-table id="basicTable"></ui-advanced-data-table>
          </div>
          
          <div style="margin-top: 16px; padding: 12px; background-color: #f0f9ff; border-radius: 6px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              💡 Table with 50 records and 15 columns. Scroll horizontally and vertically to view all data. Click column headers to sort.
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('basicTable');
        if (table) {
          table.data = sampleData;
          table.columns = columns;
          table.sortable = true;
          table.filterable = true;
          table.searchable = true;
        }
      }, 100);
    };

    window.showTableWithSelection = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>Table with Row Selection</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">Select single or multiple rows with checkboxes</p>
          <ui-advanced-data-table id="selectTable"></ui-advanced-data-table>
          
          <div id="selectionInfo" style="margin-top: 16px; padding: 12px; background-color: #dcfce7; border-radius: 6px;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              Selected rows: <strong>0</strong>
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('selectTable');
        if (table) {
          table.data = sampleData.slice(0, 5);
          table.columns = columns.slice(0, 5);
          table.sortable = true;
          table.selectable = true;
          table.pagination = false;
          
          table.addEventListener('rowSelect', (e) => {
            const infoDiv = document.getElementById('selectionInfo');
            if (infoDiv) {
              infoDiv.innerHTML = `
                <p style="margin: 0; color: #065f46; font-size: 14px;">
                  Selected rows: <strong>${e.detail.selectedRows.length}</strong>
                </p>
              `;
            }
          });
          
          table.addEventListener('rowDeselect', (e) => {
            const infoDiv = document.getElementById('selectionInfo');
            if (infoDiv) {
              infoDiv.innerHTML = `
                <p style="margin: 0; color: #065f46; font-size: 14px;">
                  Selected rows: <strong>${e.detail.selectedRows.length}</strong>
                </p>
              `;
            }
          });
        }
      }, 100);
    };

    window.showRowActions = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>Row Actions Menu</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">3-dot menu for each row with edit/delete actions</p>
          <ui-advanced-data-table id="actionsTable"></ui-advanced-data-table>
          
          <div id="actionLog" style="margin-top: 16px; padding: 12px; background-color: #fef3c7; border-radius: 6px;">
            <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 14px;">Action Log:</h4>
            <div id="logContent" style="color: #78350f; font-size: 14px; font-family: monospace;">
              <p style="margin: 0;">Click the 3-dot menu on any row to perform actions...</p>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('actionsTable');
        if (table) {
          table.data = sampleData.slice(0, 6);
          table.columns = [
            { id: 'name', field: 'name', label: 'Name', sortable: true },
            { id: 'email', field: 'email', label: 'Email', sortable: true },
            { id: 'department', field: 'department', label: 'Department', sortable: true },
            { id: 'role', field: 'role', label: 'Role', sortable: true },
            { id: 'status', field: 'status', label: 'Status', sortable: true }
          ];
          table.sortable = true;
          table.showActions = true;
          table.pagination = false;

          const logContent = document.getElementById('logContent');
          const addLog = function(message, color) {
            if (logContent) {
              const timestamp = new Date().toLocaleTimeString();
              const logEntry = document.createElement('p');
              logEntry.style.margin = '4px 0';
              logEntry.style.color = color || '#78350f';
              logEntry.textContent = '[' + timestamp + '] ' + message;
              logContent.appendChild(logEntry);
              
              // Keep only last 5 logs
              while (logContent.children.length > 5) {
                logContent.removeChild(logContent.firstChild);
              }
            }
          };

          table.addEventListener('rowEdit', function(e) {
            addLog('Edit action for: ' + e.detail.row.name + ' (ID: ' + e.detail.row.id + ')', '#1d4ed8');
          });

          table.addEventListener('rowDelete', function(e) {
            addLog('Delete action for: ' + e.detail.row.name + ' (ID: ' + e.detail.row.id + ')', '#dc2626');
          });

          table.addEventListener('rowAction', function(e) {
            addLog('Custom action "' + e.detail.action + '" for: ' + e.detail.row.name, '#7c3aed');
          });
        }
      }, 100);
    };

    window.showEditableTable = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>Editable Table Mode</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">All cells are editable with appropriate input types based on data type</p>
          
          <ui-advanced-data-table id="editableTable"></ui-advanced-data-table>
          
          <div id="editLog" style="margin-top: 16px; padding: 12px; background-color: #ecfdf5; border-radius: 6px;">
            <h4 style="margin: 0 0 8px 0; color: #065f46; font-size: 14px;">Edit Log:</h4>
            <div id="editLogContent" style="color: #047857; font-size: 13px; font-family: monospace; max-height: 200px; overflow-y: auto;">
              <p style="margin: 0;">Edit any cell to see changes logged here...</p>
            </div>
          </div>

          <div style="margin-top: 16px; padding: 12px; background-color: #eff6ff; border-radius: 6px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              💡 <strong>Features:</strong> Each column type renders appropriate input (text, number, date, email, checkbox, switch, rating, select, etc.)
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('editableTable');
        if (table) {
          const editableData = [
            { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, website: 'https://johndoe.com', phone: '+1-555-0123', salary: 95000, startDate: '2022-01-15', rating: 4, active: true, verified: true },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, website: 'https://janesmith.io', phone: '+1-555-0124', salary: 85000, startDate: '2021-06-10', rating: 5, active: true, verified: false },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, website: 'https://bobjohnson.dev', phone: '+1-555-0125', salary: 105000, startDate: '2020-03-22', rating: 3, active: false, verified: true },
            { id: 4, name: 'Alice Williams', email: 'alice@example.com', age: 29, website: 'https://alice.dev', phone: '+1-555-0126', salary: 70000, startDate: '2021-09-05', rating: 4, active: true, verified: true }
          ];

          const editableColumns = [
            { id: 'name', field: 'name', label: 'Name', type: 'text', editable: true },
            { id: 'email', field: 'email', label: 'Email', type: 'email', editable: true },
            { id: 'age', field: 'age', label: 'Age', type: 'number', editable: true },
            { id: 'website', field: 'website', label: 'Website', type: 'url', editable: true },
            { id: 'phone', field: 'phone', label: 'Phone', type: 'tel', editable: true },
            { id: 'salary', field: 'salary', label: 'Salary', type: 'number', editable: true },
            { id: 'startDate', field: 'startDate', label: 'Start Date', type: 'date', editable: true },
            { id: 'rating', field: 'rating', label: 'Rating', type: 'rating', maxRating: 5, editable: true },
            { id: 'active', field: 'active', label: 'Active', type: 'switch', editable: true },
            { id: 'verified', field: 'verified', label: 'Verified', type: 'checkbox', editable: true }
          ];

          table.data = editableData;
          table.columns = editableColumns;
          table.editable = true;
          table.sortable = true;
          table.pagination = false;

          const editLogContent = document.getElementById('editLogContent');
          editLogContent.innerHTML = '';

          table.addEventListener('cellEdit', function(e) {
            const timestamp = new Date().toLocaleTimeString();
            const logEntry = document.createElement('p');
            logEntry.style.margin = '4px 0';
            logEntry.style.padding = '6px 8px';
            logEntry.style.background = '#fff';
            logEntry.style.borderRadius = '4px';
            logEntry.style.borderLeft = '3px solid #10b981';
            logEntry.textContent = '[' + timestamp + '] Row ' + e.detail.rowId + ' - ' + e.detail.field + ': ' + JSON.stringify(e.detail.value);
            editLogContent.appendChild(logEntry);
            
            if (editLogContent.children.length > 10) {
              editLogContent.removeChild(editLogContent.firstChild);
            }
            
            editLogContent.scrollTop = editLogContent.scrollHeight;
          });
        }
      }, 100);
    };

    window.showSkeletonLoading = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>Skeleton Loading State</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">Animated skeleton screens while data loads</p>
          
          <div style="display: flex; gap: 12px; margin-bottom: 16px;">
            <button onclick="loadWithSkeleton()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Load with Skeleton</button>
            <button onclick="loadWithSpinner()" style="padding: 8px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Load with Spinner</button>
          </div>
          
          <div id="skeletonDemo"></div>
          
          <div style="margin-top: 16px; padding: 12px; background-color: #f0f9ff; border-radius: 6px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              ✨ Skeleton loading provides better perceived performance by showing content placeholders.
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        loadWithSkeleton();
      }, 100);
    };

    window.loadWithSkeleton = function() {
      const container = document.getElementById('skeletonDemo');
      if (container) {
        container.innerHTML = '<ui-advanced-data-table id="skeletonTable" loading="true" show-skeleton="true" skeleton-rows="5"></ui-advanced-data-table>';
        
        setTimeout(() => {
          const table = document.getElementById('skeletonTable');
          if (table) {
            table.columns = columns.slice(0, 5);
            
            setTimeout(() => {
              table.data = sampleData.slice(0, 5);
              table.loading = false;
              table.pagination = false;
            }, 2000);
          }
        }, 100);
      }
    };

    window.loadWithSpinner = function() {
      const container = document.getElementById('skeletonDemo');
      if (container) {
        container.innerHTML = '<ui-advanced-data-table id="spinnerTable" loading="true" show-skeleton="false"></ui-advanced-data-table>';
        
        setTimeout(() => {
          const table = document.getElementById('spinnerTable');
          if (table) {
            table.columns = columns.slice(0, 5);
            
            setTimeout(() => {
              table.data = sampleData.slice(0, 5);
              table.loading = false;
              table.pagination = false;
            }, 2000);
          }
        }, 100);
      }
    };

    window.showColumnGrouping = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>Column Grouping (Multi-Level Headers)</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">Group related columns under common parent headers</p>
          <ui-advanced-data-table id="columnGroupTable"></ui-advanced-data-table>
          
          <div style="margin-top: 16px; padding: 12px; background-color: #f0fdf4; border-radius: 6px;">
            <p style="margin: 0; color: #166534; font-size: 14px;">
              ✓ Column grouping organizes related data with hierarchical headers for better visual structure.
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('columnGroupTable');
        if (table) {
          table.columns = [
            { id: 'id', field: 'id', label: 'ID', width: '70px' },
            {
              id: 'personal',
              label: 'Personal Information',
              children: [
                { id: 'name', field: 'name', label: 'Name', sortable: true },
                { id: 'email', field: 'email', label: 'Email', type: 'email' },
                { id: 'phone', field: 'phone', label: 'Phone', type: 'tel' }
              ]
            },
            {
              id: 'employment',
              label: 'Employment Details',
              children: [
                { id: 'department', field: 'department', label: 'Department', sortable: true },
                { id: 'role', field: 'role', label: 'Role' },
                { id: 'salary', field: 'salary', label: 'Salary', format: function(v) { return '$' + v.toLocaleString(); } }
              ]
            },
            {
              id: 'status_info',
              label: 'Status',
              children: [
                { id: 'status', field: 'status', label: 'Employment Status' },
                { id: 'active', field: 'active', label: 'Active', type: 'switch', align: 'center' }
              ]
            }
          ];
          table.data = sampleData.slice(0, 5);
          table.columnGrouping = true;
          table.pagination = false;
        }
      }, 100);
    };

    window.showRowGrouping = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>Row Grouping</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">Group rows by column values with expand/collapse functionality</p>
          
          <div style="display: flex; gap: 12px; margin-bottom: 16px;">
            <button onclick="groupByDepartment()" style="padding: 8px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">Group by Department</button>
            <button onclick="groupByStatus()" style="padding: 8px 16px; background-color: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer;">Group by Status</button>
            <button onclick="clearGrouping()" style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer;">Clear Grouping</button>
          </div>
          
          <ui-advanced-data-table id="rowGroupTable"></ui-advanced-data-table>
          
          <div style="margin-top: 16px; padding: 12px; background-color: #fef3c7; border-radius: 6px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              💡 Click on group headers to expand/collapse groups. Each group shows item count.
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('rowGroupTable');
        if (table) {
          table.columns = [
            { id: 'name', field: 'name', label: 'Name', sortable: true },
            { id: 'email', field: 'email', label: 'Email', type: 'email' },
            { id: 'department', field: 'department', label: 'Department', sortable: true, groupable: true },
            { id: 'status', field: 'status', label: 'Status', groupable: true },
            { id: 'salary', field: 'salary', label: 'Salary', format: function(v) { return '$' + v.toLocaleString(); } }
          ];
          table.data = sampleData;
          table.pagination = false;
          groupByDepartment();
        }
      }, 100);
    };

    window.groupByDepartment = function() {
      const table = document.getElementById('rowGroupTable');
      if (table) {
        table.groupBy = 'department';
        table.expandGroupsByDefault = true;
        table.showGroupCount = true;
      }
    };

    window.groupByStatus = function() {
      const table = document.getElementById('rowGroupTable');
      if (table) {
        table.groupBy = 'status';
        table.expandGroupsByDefault = true;
        table.showGroupCount = true;
      }
    };

    window.clearGrouping = function() {
      const table = document.getElementById('rowGroupTable');
      if (table) {
        table.groupBy = '';
      }
    };

    window.showInputTypes = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>Multiple Cell Input Types</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">Rich input types with editable cells - double-click to edit</p>
          <ui-advanced-data-table id="inputTypesTable" editable="true"></ui-advanced-data-table>
          
          <div style="margin-top: 16px; padding: 12px; background-color: #eff6ff; border-radius: 6px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              🎨 Double-click cells to edit. Available types:
            </p>
            <ul style="margin: 8px 0 0 20px; color: #1e40af; font-size: 13px; line-height: 1.8;">
              <li><strong>Text, Number, Email, URL, Tel:</strong> Standard inputs</li>
              <li><strong>Date, Time, DateTime:</strong> Date/time pickers</li>
              <li><strong>Checkbox, Switch:</strong> Toggle controls</li>
              <li><strong>Rating:</strong> Star rating (click stars)</li>
              <li><strong>Select:</strong> Dropdown selection</li>
              <li><strong>Image:</strong> Display images</li>
            </ul>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('inputTypesTable');
        if (table) {
          table.columns = [
            { id: 'avatar', field: 'avatar', label: 'Avatar', type: 'image', align: 'center', width: '80px',
              imageStyle: { width: '40px', height: '40px', borderRadius: '50%' } },
            { id: 'name', field: 'name', label: 'Name (Text)', type: 'text', editable: true },
            { id: 'email', field: 'email', label: 'Email', type: 'email', editable: true },
            { id: 'phone', field: 'phone', label: 'Phone', type: 'tel', editable: true },
            { id: 'website', field: 'website', label: 'Website', type: 'url', editable: true },
            { id: 'rating', field: 'rating', label: 'Rating', type: 'rating', editable: true, maxRating: 5, align: 'center' },
            { id: 'active', field: 'active', label: 'Active', type: 'switch', editable: true, align: 'center' },
            { id: 'verified', field: 'verified', label: 'Verified', type: 'checkbox', editable: true, align: 'center' },
            { id: 'startDate', field: 'startDate', label: 'Start Date', type: 'date', editable: true },
            { id: 'status', field: 'status', label: 'Status', type: 'select', editable: true, 
              selectOptions: [
                { label: 'Active', value: 'Active' },
                { label: 'On Leave', value: 'On Leave' },
                { label: 'Inactive', value: 'Inactive' }
              ]
            }
          ];
          table.data = sampleData.slice(0, 5);
          table.pagination = false;
        }
      }, 100);
    };

    window.showTableWithGrouping = function() {
      // Redirect to showRowGrouping
      showRowGrouping();
    };

    window.showTableWithPagination = function() {
      // Redirect to showBasicTable since it has pagination
      showBasicTable();
    };

    window.showInteractiveTable = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>🎮 Interactive Playground</h3>
          <p style="color: #6b7280; margin-bottom: 16px;">Combine all features and see them work together!</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 16px;">
            <button onclick="loadCombinedDemo()" style="padding: 10px 16px; background-color: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">🚀 Load Demo</button>
            <button onclick="toggleSkeleton()" style="padding: 10px 16px; background-color: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer;">Toggle Skeleton</button>
            <button onclick="toggleGrouping()" style="padding: 10px 16px; background-color: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer;">Toggle Grouping</button>
            <button onclick="toggleSelection()" style="padding: 10px 16px; background-color: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Toggle Selection</button>
            <button onclick="toggleActions()" style="padding: 10px 16px; background-color: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer;">Toggle Actions</button>
            <button onclick="toggleEditable()" style="padding: 10px 16px; background-color: #f97316; color: white; border: none; border-radius: 6px; cursor: pointer;">Toggle Editable</button>
          </div>
          
          <div id="playgroundStatus" style="padding: 12px; background-color: #e0e7ff; border-radius: 6px; margin-bottom: 16px; font-size: 14px; color: #3730a3;">
            <strong>Current Settings:</strong> <span id="statusText">Loading...</span>
          </div>
          
          <ui-advanced-data-table 
            id="combinedTable" 
            selectable="true" 
            show-skeleton="true"
            skeleton-rows="6"></ui-advanced-data-table>
          
          <div style="margin-top: 16px; padding: 12px; background-color: #f0fdf4; border-radius: 6px;">
            <p style="margin: 0; color: #166534; font-size: 14px;">
              🎯 <strong>Interactive Features:</strong> Skeleton Loading, Column Grouping, Row Grouping, Selection, Row Actions, Editable Mode, Sorting, Filtering, Pagination
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        loadCombinedDemo();
      }, 100);
    };

    window.loadCombinedDemo = function() {
      const table = document.getElementById('combinedTable');
      if (table) {
        table.loading = true;
        updatePlaygroundStatus();
        
        setTimeout(() => {
          table.columns = [
            { id: 'id', field: 'id', label: 'ID', width: '70px', sortable: true },
            {
              id: 'personal',
              label: 'Personal Info',
              children: [
                { id: 'avatar', field: 'avatar', label: 'Avatar', type: 'image', align: 'center', width: '80px',
                  imageStyle: { width: '40px', height: '40px', borderRadius: '50%' } },
                { id: 'name', field: 'name', label: 'Name', sortable: true, editable: true },
                { id: 'email', field: 'email', label: 'Email', type: 'email', editable: true }
              ]
            },
            {
              id: 'work',
              label: 'Work Details',
              children: [
                { id: 'department', field: 'department', label: 'Department', sortable: true, groupable: true },
                { id: 'role', field: 'role', label: 'Role' },
                { id: 'salary', field: 'salary', label: 'Salary', format: function(v) { return '$' + v.toLocaleString(); } }
              ]
            },
            {
              id: 'status_group',
              label: 'Status & Performance',
              children: [
                { id: 'status', field: 'status', label: 'Status', groupable: true },
                { id: 'rating', field: 'rating', label: 'Rating', type: 'rating', editable: true, maxRating: 5, align: 'center' },
                { id: 'active', field: 'active', label: 'Active', type: 'switch', editable: true, align: 'center' }
              ]
            }
          ];
          table.data = sampleData;
          table.loading = false;
          table.columnGrouping = true;
          table.sortable = true;
          table.filterable = true;
          table.searchable = true;
          table.pagination = true;
          table.pageSize = 5;
          table.editable = false;
          table.groupBy = '';
          table.showActions = false;
          updatePlaygroundStatus();
        }, 2000);
      }
    };

    function updatePlaygroundStatus() {
      const table = document.getElementById('combinedTable');
      const statusText = document.getElementById('statusText');
      if (!table || !statusText) return;
      
      const features = [];
      if (table.loading) features.push('Loading');
      if (table.selectable) features.push('Selection');
      if (table.editable) features.push('Editable');
      if (table.groupBy) features.push('Grouped by ' + table.groupBy);
      if (table.showActions) features.push('Row Actions');
      if (table.columnGrouping) features.push('Column Groups');
      if (table.sortable) features.push('Sortable');
      if (table.filterable) features.push('Filterable');
      if (table.pagination) features.push('Pagination');
      
      statusText.textContent = features.length > 0 ? features.join(', ') : 'None';
    }

    window.toggleSkeleton = function() {
      const table = document.getElementById('combinedTable');
      if (table) {
        table.loading = !table.loading;
        updatePlaygroundStatus();
      }
    };

    window.toggleGrouping = function() {
      const table = document.getElementById('combinedTable');
      if (table) {
        if (table.groupBy) {
          table.groupBy = '';
        } else {
          table.groupBy = 'department';
          table.expandGroupsByDefault = true;
          table.showGroupCount = true;
        }
        updatePlaygroundStatus();
      }
    };

    window.toggleSelection = function() {
      const table = document.getElementById('combinedTable');
      if (table) {
        table.selectable = !table.selectable;
        updatePlaygroundStatus();
      }
    };

    window.toggleActions = function() {
      const table = document.getElementById('combinedTable');
      if (table) {
        table.showActions = !table.showActions;
        updatePlaygroundStatus();
      }
    };

    window.toggleEditable = function() {
      const table = document.getElementById('combinedTable');
      if (table) {
        table.editable = !table.editable;
        updatePlaygroundStatus();
      }
    };

    // NEW ADVANCED FEATURES DEMOS

    window.showColumnPinning = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>📌 Column Pinning</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">Pin important columns to stay visible during horizontal scroll</p>
          <div style="margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="pinColumn('name', 'left')" style="padding: 6px 12px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">📌 Pin Name Left</button>
            <button onclick="pinColumn('salary', 'right')" style="padding: 6px 12px; background-color: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer;">📌 Pin Salary Right</button>
            <button onclick="pinColumn('email', 'left')" style="padding: 6px 12px; background-color: #0ea5e9; color: white; border: none; border-radius: 4px; cursor: pointer;">📌 Pin Email Left</button>
            <button onclick="pinColumn('department', 'right')" style="padding: 6px 12px; background-color: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer;">📌 Pin Dept Right</button>
            <button onclick="pinColumn('name', 'none')" style="padding: 6px 12px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">❌ Unpin Name</button>
            <button onclick="pinColumn('salary', 'none')" style="padding: 6px 12px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">❌ Unpin Salary</button>
            <button onclick="pinColumn('email', 'none')" style="padding: 6px 12px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">❌ Unpin Email</button>
            <button onclick="pinColumn('department', 'none')" style="padding: 6px 12px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">❌ Unpin Dept</button>
          </div>
          <ui-advanced-data-table id="pinningTable" column-pinning="true"></ui-advanced-data-table>
          <div id="pinningInfo" style="margin-top: 16px; padding: 12px; background-color: #eff6ff; border-radius: 6px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">💡 Pinned columns: <strong id="pinnedColumnsText">None</strong></p>
          </div>
        </div>
      `;
      setTimeout(() => {
        const table = document.getElementById('pinningTable');
        if (table) {
          // Add more columns
          table.columns = [
            { id: 'id', field: 'id', label: 'ID', sortable: true, width: '80px' },
            { id: 'name', field: 'name', label: 'Name', sortable: true },
            { id: 'email', field: 'email', label: 'Email', sortable: true },
            { id: 'department', field: 'department', label: 'Department', sortable: true, filterable: true },
            { id: 'role', field: 'role', label: 'Role', sortable: true },
            { id: 'salary', field: 'salary', label: 'Salary', sortable: true, format: function(value) { return '$' + value.toLocaleString(); } },
            { id: 'status', field: 'status', label: 'Status', sortable: true, filterable: true },
            { id: 'rating', field: 'rating', label: 'Rating', sortable: true },
            { id: 'active', field: 'active', label: 'Active', sortable: true },
            { id: 'verified', field: 'verified', label: 'Verified', sortable: true },
            { id: 'startDate', field: 'startDate', label: 'Start Date', sortable: true },
            { id: 'avatar', field: 'avatar', label: 'Avatar', sortable: false }
          ];
          // Add more rows
          const moreRows = [];
          for (let i = 9; i <= 30; i++) {
            moreRows.push({
              id: i,
              name: 'User ' + i,
              email: 'user' + i + '@example.com',
              department: ['Engineering', 'Marketing', 'Sales', 'HR'][i % 4],
              role: ['Developer', 'Manager', 'Lead', 'Executive'][i % 4],
              salary: 50000 + i * 1000,
              status: ['Active', 'Inactive', 'On Leave'][i % 3],
              rating: (i % 5) + 1,
              active: i % 2 === 0,
              verified: i % 3 === 0,
              startDate: '2022-01-' + ((i % 28) + 1).toString().padStart(2, '0'),
              avatar: 'https://i.pravatar.cc/150?img=' + (i % 70)
            });
          }
          table.data = sampleData.concat(moreRows);
          table.sortable = true;
          table.pagination = true;
          table.pageSize = 10;
          table.filterable = true;
          table.searchable = true;
          table.addEventListener('columnPin', (e) => {
            const { columnId, position } = e.detail;
            const pinnedText = document.getElementById('pinnedColumnsText');
            if (pinnedText) {
              const pinned = [];
              if (table.pinnedColumns?.left?.length) pinned.push(`Left: ${table.pinnedColumns.left.join(', ')}`);
              if (table.pinnedColumns?.right?.length) pinned.push(`Right: ${table.pinnedColumns.right.join(', ')}`);
              pinnedText.textContent = pinned.length > 0 ? pinned.join(' | ') : 'None';
            }
            console.log('Column pinned:', columnId, position);
          });
        }
        window.pinColumn = function(columnId, position) {
          const table = document.getElementById('pinningTable');
          if (table && typeof table.handleColumnPin === 'function') {
            table.handleColumnPin(columnId, position);
          }
        };
      }, 100);
    };

    window.showRowPinning = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>📍 Row Pinning</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">Pin important rows to top or bottom</p>
          
          <div style="margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="pinRow(1, 'top')" style="padding: 6px 12px; background-color: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">📍 Pin Row 1 Top</button>
            <button onclick="pinRow(8, 'bottom')" style="padding: 6px 12px; background-color: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer;">📍 Pin Row 8 Bottom</button>
            <button onclick="pinRow(1, 'none')" style="padding: 6px 12px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">❌ Unpin Row 1</button>
            <button onclick="pinRow(8, 'none')" style="padding: 6px 12px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">❌ Unpin Row 8</button>
          </div>

          <ui-advanced-data-table id="rowPinningTable" row-pinning="true"></ui-advanced-data-table>
          
          <div id="rowPinningInfo" style="margin-top: 16px; padding: 12px; background-color: #f0fdf4; border-radius: 6px;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              💡 Pinned rows: <strong id="pinnedRowsText">None</strong>
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('rowPinningTable');
        if (table) {
          table.data = sampleData;
          table.columns = columns.slice(0, 6);

          table.addEventListener('rowPin', (e) => {
            const { rowId, position } = e.detail;
            const pinnedText = document.getElementById('pinnedRowsText');
            if (pinnedText) {
              const pinned = [];
              if (table.pinnedRows?.top?.length) pinned.push(`Top: ${table.pinnedRows.top.join(', ')}`);
              if (table.pinnedRows?.bottom?.length) pinned.push(`Bottom: ${table.pinnedRows.bottom.join(', ')}`);
              pinnedText.textContent = pinned.length > 0 ? pinned.join(' | ') : 'None';
            }
            console.log('Row pinned:', rowId, position);
          });
        }

        window.pinRow = function(rowId, position) {
          const table = document.getElementById('rowPinningTable');
          if (table && typeof table.handleRowPin === 'function') {
            table.handleRowPin(rowId, position);
          }
        };
      }, 100);
    };

    window.showRowReordering = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>↕️ Row Reordering</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">Drag and drop rows to reorder them</p>

          <ui-advanced-data-table id="reorderTable" row-reorder="true"></ui-advanced-data-table>
          
          <div id="reorderInfo" style="margin-top: 16px; padding: 12px; background-color: #fef3c7; border-radius: 6px;">
            <p style="margin: 0; color: #78350f; font-size: 14px;">
              💡 <strong>Drag the drag handle (⋮⋮)</strong> on each row to reorder. Last reorder: <strong id="lastReorderText">None</strong>
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('reorderTable');
        if (table) {
          table.data = [...sampleData];
          table.columns = columns.slice(0, 5);

          table.addEventListener('rowReorderEvent', (e) => {
            const { fromIndex, toIndex } = e.detail;
            const lastReorderText = document.getElementById('lastReorderText');
            if (lastReorderText) {
              lastReorderText.textContent = `Row ${fromIndex + 1} → Row ${toIndex + 1}`;
            }
            console.log('Row reordered:', e.detail);
          });
        }
      }, 100);
    };

    window.showMultiFilter = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>🔍 Multi-Column Filtering</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">Apply multiple filters to different columns</p>
          
          <div style="margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="addDeptFilter()" style="padding: 6px 12px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">+ Engineering Filter</button>
            <button onclick="addSalaryFilter()" style="padding: 6px 12px; background-color: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer;">+ Salary > 80K</button>
            <button onclick="addStatusFilter()" style="padding: 6px 12px; background-color: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">+ Active Status</button>
            <button onclick="clearFilters()" style="padding: 6px 12px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">🗑️ Clear All</button>
          </div>

          <ui-advanced-data-table id="filterTable" multi-filter="true"></ui-advanced-data-table>
          
          <div id="filterInfo" style="margin-top: 16px; padding: 12px; background-color: #dbeafe; border-radius: 6px;">
            <p style="margin: 0; color: #1e3a8a; font-size: 14px;">
              💡 Active filters: <strong id="activeFiltersText">None</strong>
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('filterTable');
        if (table) {
          table.data = sampleData;
          table.columns = columns;
          table.sortable = true;

          function updateFilterInfo() {
            const activeFiltersText = document.getElementById('activeFiltersText');
            if (activeFiltersText && table.activeFilters) {
              const filters = [];
              table.activeFilters.forEach((value, key) => {
                if (value.length > 0) {
                  filters.push(`${key}: ${value.length} filter(s)`);
                }
              });
              activeFiltersText.textContent = filters.length > 0 ? filters.join(', ') : 'None';
            }
          }

          window.addDeptFilter = function() {
            if (table && typeof table.addFilter === 'function') {
              table.addFilter('department', 'equals', 'Engineering');
              updateFilterInfo();
              console.log('Added department filter');
            }
          };

          window.addSalaryFilter = function() {
            if (table && typeof table.addFilter === 'function') {
              table.addFilter('salary', 'greaterThan', 80000);
              updateFilterInfo();
              console.log('Added salary filter');
            }
          };

          window.addStatusFilter = function() {
            if (table && typeof table.addFilter === 'function') {
              table.addFilter('status', 'equals', 'Active');
              updateFilterInfo();
              console.log('Added status filter');
            }
          };

          window.clearFilters = function() {
            if (table && typeof table.clearAllFilters === 'function') {
              table.clearAllFilters();
              updateFilterInfo();
              console.log('Cleared all filters');
            }
          };
        }
      }, 100);
    };

    window.showEditEvents = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>📡 Edit Lifecycle Events</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">Track cell and row edit events in real-time</p>

          <ui-advanced-data-table id="eventsTable" editable="true"></ui-advanced-data-table>
          
          <div style="margin-top: 16px;">
            <h4 style="margin-bottom: 8px;">Event Log:</h4>
            <div id="eventLog" style="padding: 12px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; max-height: 300px; overflow-y: auto; font-family: monospace; font-size: 12px;">
              <div style="color: #6b7280;">Waiting for events...</div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('eventsTable');
        const eventLog = document.getElementById('eventLog');
        
        if (table) {
          table.data = sampleData.slice(0, 5);
          const editableColumns = columns.slice(0, 6).map(col => ({
            ...col,
            editable: true,
            inputType: col.field === 'salary' ? 'number' : col.field === 'email' ? 'email' : 'text'
          }));
          table.columns = editableColumns;

          function logEvent(eventName, detail, color) {
            if (eventLog) {
              const timestamp = new Date().toLocaleTimeString();
              const entry = document.createElement('div');
              entry.style.marginBottom = '4px';
              entry.style.color = color;
              entry.innerHTML = `<strong>[${timestamp}]</strong> <span style="color: ${color};">${eventName}</span>: ${JSON.stringify(detail, null, 2)}`;
              eventLog.insertBefore(entry, eventLog.firstChild);
            }
          }

          table.addEventListener('cellEditStart', (e) => {
            logEvent('cellEditStart', e.detail, '#3b82f6');
            console.log('Cell edit started:', e.detail);
          });

          table.addEventListener('cellEditStop', (e) => {
            logEvent('cellEditStop', e.detail, '#10b981');
            console.log('Cell edit stopped:', e.detail);
          });

          table.addEventListener('rowEditStart', (e) => {
            logEvent('rowEditStart', { rowId: e.detail.row.id, name: e.detail.row.name }, '#8b5cf6');
            console.log('Row edit started:', e.detail);
          });

          table.addEventListener('rowEditStop', (e) => {
            logEvent('rowEditStop', { rowId: e.detail.row.id, name: e.detail.row.name }, '#f59e0b');
            console.log('Row edit stopped:', e.detail);
          });
        }
      }, 100);
    };

    window.showAdvancedPanels = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>🎛️ Filter & Column Panels</h3>
          <p style="color: #6b7280; margin-bottom: 12px;">Advanced UI panels for filtering and column management</p>
          
          <div style="margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="toggleFilterPanel()" style="padding: 6px 12px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">🔍 Toggle Filter Panel</button>
            <button onclick="toggleColumnPanel()" style="padding: 6px 12px; background-color: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer;">📋 Toggle Column Panel</button>
          </div>

          <ui-advanced-data-table id="panelsTable" show-filter-panel="false" show-column-panel="false"></ui-advanced-data-table>
          
          <div style="margin-top: 16px; padding: 12px; background-color: #fef3c7; border-radius: 6px;">
            <p style="margin: 0; color: #78350f; font-size: 14px;">
              💡 Status: <strong id="panelStatus">Both panels hidden</strong>
            </p>
            <p style="margin: 8px 0 0 0; color: #78350f; font-size: 12px;">
              Note: Panel UI components are available via props. Full visual implementation coming soon!
            </p>
          </div>
        </div>
      `;

      setTimeout(() => {
        const table = document.getElementById('panelsTable');
        if (table) {
          table.data = sampleData;
          table.columns = columns;
          table.sortable = true;
          table.filterable = true;

          function updatePanelStatus() {
            const status = document.getElementById('panelStatus');
            if (status) {
              const filterPanel = table.showFilterPanel ? 'Filter Panel ON' : 'Filter Panel OFF';
              const columnPanel = table.showColumnPanel ? 'Column Panel ON' : 'Column Panel OFF';
              status.textContent = `${filterPanel}, ${columnPanel}`;
            }
          }

          window.toggleFilterPanel = function() {
            table.showFilterPanel = !table.showFilterPanel;
            updatePanelStatus();
            console.log('Filter panel:', table.showFilterPanel);
          };

          window.toggleColumnPanel = function() {
            table.showColumnPanel = !table.showColumnPanel;
            updatePanelStatus();
            console.log('Column panel:', table.showColumnPanel);
          };

          updatePanelStatus();
        }
      }, 100);
    };

    window.showSearchMultiFilterPanel = function() {
      tableContainer.innerHTML = `
        <div class="demo-block">
          <h3>🔎 Search & Multi-Filter Panel</h3>
          <div style="margin-bottom: 16px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
            <input id="searchInput" type="text" placeholder="Search..." style="padding: 8px; border-radius: 4px; border: 1px solid #d1d5db; font-size: 14px; width: 220px;" />
            <button onclick="toggleFilterPanelDemo()" style="padding: 8px 16px; background-color: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer;">🔍 Toggle Filter Panel</button>
          </div>
          <ui-advanced-data-table id="searchFilterTable" multi-filter="true" show-filter-panel="false" searchable="true"></ui-advanced-data-table>
          <div id="searchFilterInfo" style="margin-top: 16px; padding: 12px; background-color: #dbeafe; border-radius: 6px;">
            <p style="margin: 0; color: #1e3a8a; font-size: 14px;">Active filters: <strong id="activeSearchFiltersText">None</strong></p>
          </div>
        </div>
      `;
      setTimeout(() => {
        const table = document.getElementById('searchFilterTable');
        const searchInput = document.getElementById('searchInput');
        if (table) {
          table.data = sampleData;
          table.columns = columns;
          table.sortable = true;
          table.filterable = true;
          table.searchable = true;
          function updateSearchFilterInfo() {
            const activeFiltersText = document.getElementById('activeSearchFiltersText');
            if (activeFiltersText && table.activeFilters) {
              const filters = [];
              table.activeFilters.forEach((value, key) => {
                if (value.length > 0) {
                  filters.push(`${key}: ${value.length} filter(s)`);
                }
              });
              activeFiltersText.textContent = filters.length > 0 ? filters.join(', ') : 'None';
            }
          }
          table.addEventListener('filterChange', updateSearchFilterInfo);
          if (searchInput) {
            searchInput.addEventListener('input', function(e) {
              table.search = searchInput.value;
            });
          }
        }
        window.toggleFilterPanelDemo = function() {
          if (table) {
            table.showFilterPanel = !table.showFilterPanel;
          }
        };
      }, 100);
    };

    showBasicTable();
  }, 100);
}
