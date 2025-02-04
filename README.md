
# Book-Management-System
A Book Management System is a software application designed to efficiently manage the processes of a library or bookstore. It helps users perform tasks like adding, searching, and deleting books.

## Phases for Book Management System (BMS):
1. **Requirements:** In this phase, all system requirements are gathered by communicating with stakeholders such as users, managers, and technical teams.

2. **Design:** Converts requirements into an architecture or model. For example, converting an Entity Relationship Diagram (ERD) into database tables.

3. **Implementation:** Build the UI using Angular components, modules, and services. Use data binding, directives, and pipes to enhance interactivity. Style the application with Tailwind CSS for a responsive design.

4. **Testing:** In this phase, ensure the Angular application works as expected by performing different types of testing:
    
     **Unit Testing:**  Test individual components, services, and pipes using Jasmine and Karma to verify their functionality.

5. **Deployment:** Deploy the system on production servers.

6. **Maintenance:** Keep the system operational and up-to-date.

## Functionality:
- If the user selects **"Other Genre"**, a new field will appear where they can write a custom genre.
- Validate the form inputs.
- Add books and display all the details of books.
- Edit book details and delete books.
- Calculate the **age** of the book.
- Categorize books based on their genre.
- Fetch data from an external API and implement **asynchronous book searching**.
- Style the form using **Tailwind CSS** and make it responsive for **mobile, tablet, and desktop** devices.
- Implement **data binding**:
  - **Interpolation** (`{{ }}`) to dynamically display book details.
  - **Property binding** (`[property]`) to update UI elements based on data.
  - **Two-way binding** (`[(ngModel)]`) to sync user input with the model.
- Implement **event binding** (`(event)`) to handle user actions such as:
  - Clicking buttons to add, edit, or delete books.
  - Detecting user input in the search field.
  - Handling form submissions dynamically.

- Implement methods to **calculate price and discount price**.

## Technology Used:
- **Frontend:** Angular, Tailwind CSS, TypeScript
