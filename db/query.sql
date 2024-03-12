INSERT INTO department (id, name)
VALUES (1, 'IT'),
       (2, 'Sales'),
       (3, 'HR'),
       (4, 'Finance'),
       (5, 'Marketing');

-- Sample roles for each department
INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Software Engineer', 80000, 1),          -- IT Department
       (2, 'Sales Representative', 60000, 2),      -- Sales Department
       (3, 'HR Manager', 70000, 3),                -- HR Department
       (4, 'Financial Analyst', 75000, 4),         -- Finance Department
       (5, 'Marketing Specialist', 65000, 5);     -- Marketing Department

-- Sample employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Ben', 'Char', 1, NULL),   -- Ben Char, Software Engineer, No Manager
       (2, 'Jane', 'Smith', 2, 1),    -- Jane Smith, Sales Representative, Managed by Ben Char
       (3, 'Alice', 'Johnson', 3, NULL),  -- Alice Johnson, HR Manager, No Manager
       (4, 'Michael', 'Johnson', 1, NULL),   -- Michael Johnson, Software Engineer, No Manager
       (5, 'Emily', 'Davis', 2, 1),         -- Emily Davis, Sales Representative, Managed by Ben Char
       (6, 'William', 'Wilson', 3, NULL),   -- William Wilson, HR Manager, No Manager
       (7, 'Sarah', 'Brown', 4, NULL),      -- Sarah Brown, Financial Analyst, No Manager
       (8, 'Olivia', 'Martinez', 5, NULL),  -- Olivia Martinez, Marketing Specialist, No Manager
       (9, 'James', 'Taylor', 1, 1);        -- James Taylor, Software Engineer, Managed by Ben Char