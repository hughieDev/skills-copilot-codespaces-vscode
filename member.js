function skillsMember() {
    var member = {
        name: 'John Doe',
        age: 30,
        address: '123 Main St'
    };

    var skills = {
        languages: ['JavaScript', 'Ruby', 'Python'],
        isDesigner: true,
        isDeveloper: true
    };

    // Add the skills object as a property of the member object
    member.skills = skills;

    // Return the member object
    return member;
}