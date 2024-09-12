module.exports = {
    privGroups: [
        {
            id: "USERS",
            name: "User Permissions"
        },
        {
            id: "ROLE",
            name: "Role Permissions"
        },
        {
            id: "CATEGORIES",
            name: "Category Permissions"
        },
        {
            id: "AUDITLOGS",
            name:"Auditlogs"
        }
    ],
    privileges:[
        {
            key: "user_view",
            name: "User View",
            groups: "USERS",
            description: "User view"
        },
        {
            key: "user_add",
            name: "User Add",
            groups: "USERS",
            description: "User add"
        },
        {
            key: "user_update",
            name: "User Update",
            groups: "USERS",
            description: "User update"
        },
        {
            key: "user_delete",
            name: "User Delete",
            groups: "USERS",
            description: "User delete"
        },



        {
            key: "role_view",
            name: "Role View",
            groups: "ROLE",
            description: "Role view"
        },
        {
            key: "role_add",
            name: "Role Add",
            groups: "ROLE",
            description: "Role add"
        },
        {
            key: "role_update",
            name: "Role Update",
            groups: "ROLE",
            description: "Role update"
        },
        {
            key: "role_delete",
            name: "Role Delete",
            groups: "ROLE",
            description: "Role delete"
        },


        {
            key: "category_view",
            name: "Category View",
            groups: "CATEGORIES",
            description: "Categories view"
        },
        {
            key: "category_add",
            name: "category Add",
            groups: "CATEGORIES",
            description: "category add"
        },
        {
            key: "category_update",
            name: "category Update",
            groups: "CATEGORIES",
            description: "category update"
        },
        {
            key: "category_delete",
            name: "category Delete",
            groups: "CATEGORIES",
            description: "category delete"
        },
        {
            key: "auditlogs_view",
            name: "Auditlogs View",
            groups: "AUDITLOGS",
            description: "auditlogs view"
        }
    ]

}