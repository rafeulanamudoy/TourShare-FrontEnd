### Live Project

You can visit the live project here: [TourShare Live](https://tour-share-front-end.vercel.app)

## TourShare Overview

**TourShare** is a dynamic team management platform designed for users to create travel teams, manage join requests, and communicate seamlessly within the platform. The application integrates secure user authentication, real-time messaging, and a robust notification system, ensuring a smooth and interactive experience for users.

### Features:

- Designed and implemented a team management system allowing users to create teams, manage membership requests, and approve or decline join requests.
- Enabled users to specify team details, including travel logistics, budget, activities, and responsibilities dynamically.
- Developed a workflow for users to send and manage join requests to teams, with real-time updates on approval status using socket.io.
- Integrated a notification system to alert team owners about new requests and allow communication with requesters before approval.
- Implemented real-time private messaging using socket.io to facilitate communication between team owners and potential members.
- Integrated a notification system for join requests, status updates, and team activities.
- Integrated secure user authentication and verification using JWT, including email verification during sign-up.
- Integrated Cloudinary for secure profile image upload and management, enabling users to upload and update their profile pictures seamlessly.
- Developed functionality to dynamically update team members and their roles based on accepted join requests, ensuring that team information stays current in real-time.
- **Role-based Access**: The platform supports three user roles with different levels of access:
  - **Customer**
  - **Admin**
  - **Super Admin**

## User Roles and Access

TourShare employs three distinct user roles with different levels of access and permissions:

1. **Customer**:

   - Customers can create and join travel teams.
   - In their dashboard, customers have access to several sections:

     - **Profile Section**: Customers can update their profile information.
     - **Your Team Section**: If the customer creates a team, they can:
       - View details of people who have sent join requests.
       - accept pending or cancel the request of join member
       - Update or delete their team as needed.
     - **Join Team Section**: If the customer has joined a team, they can:
       - Cancel their join request.
     - **Message Section**: Customers can:
       - Send messages to members of the team they have joined.
       - If they created the team, they can message people who have requested to join.

   - To create a Customer account, visit this link: [Create Customer](https://tour-share-front-end.vercel.app/signUp).

2. **Super Admin**:

   - The Super Admin has access to manage users and only super admin can create admin accounts.
   - To create an Super Admin account visit : [Super Admin](https://tour-share-front-end.vercel.app/superAdmin).and also when create account must have provide the Secret Key.and the secret key is **super-secret-key**

3. **Admin**:

   - Admins are responsible for managing teams within the platform.
