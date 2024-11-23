database will becreated separetly, i will connect to it using pyton, focust on
multistep for , full codeusing shadcn NExtjs, tailwind and typescript, provide
code on md with comments and file structure: consider this info - I am working
the stokvel solution for the hackerthon and i want you to refine my solution, wi
ll be creating a website that will have 3 access points, the landing page will
be available to everyone, the will be a registration form (personal info, number
of admin 1-3, 1 is the phone number of the person who was registering,
addtiotional adim if selected must enter the numbers, once those numbers
register on their side and reach the data , access will be cross referenced to
numbers) then the next step of the registration page will be to select stokvel
type, Fixed, or Circumstance/event like death then the next step will be to
enter all members, all members will be registered through their number, will
maybe generate a link to that number for registration where they will submit
their personal info through whatsapp or linked to the form online. AFTER
EVERYONE HAS REGISTERED, the creator will be notified to start account, all
regestered users have inofrmation about the stokfel, like who deposited , who is
behind and so forth. THE ADMIN access will approve withdrawals. improve, provide
full multistep code for registaropn form { "personalInfo": { "fullName": "",
"idNumber": "", //13 digits "phoneNumber": "", "email": "" // not required },
"stokvelDetails":

{ "type": "fixed|event", // Enum "name": "", "description": "",
"contributionAmount": 0, "frequency": "monthly|quarterly|annually" },
"adminDetails": { "primaryAdmin": { "phoneNumber": "", "permissions": ["full"]
}, "additionalAdmins": [ { "phoneNumber": "", "permissions": ["partial"] } ] },
"members": [ { "phoneNumber": "", "status": "pending|invited|confirmed",
"joinedAt": null } ], "metadata": { "createdAt": null, "updatedAt": null,
"status": "draft|active|completed" } }
