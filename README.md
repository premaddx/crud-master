# CRUD-MASTER
> Comprehensive Data Table with basic CRUD operations.

### Description
```
With this datable as an end user you should be able to:
 1. Create an employee.
 2. Read the data of a particular employee and all employees.
 3. Update the details of the employee.
 4. Delete a particular employee.
 5. Sort the records.
 6. Search the records.

```

### To run the project run command -

```shell
    $ yarn start
```

### Features  -

```
    1. View data in tabular format -
        The page size, page number, number of pagination buttons, search is handled by the reducer.
        All the initial configurations of the same is provided in the initial state of the reducer.
        Inititally state of the reducer is initialized with 3 default entries provided by the mock api.

    2. Sortability -
        The sortability of the column is configured in the Homepage/constants.js. I have exported a
        COLUMNS variable which has configuration of column like - display name of column, sortability
        of a column etc. This COLUMNS variable is supplied to the table component via props.

    3. Searching -
        The search functionality in the table is also controlled via reducer.

    4. Fixed header -
        Behaviour for the fixed header is controlled by the fixedHeader prop supplied to the table component.

    5. Pagination -
        The pagination functionality in the table is also controlled via reducer.

```
