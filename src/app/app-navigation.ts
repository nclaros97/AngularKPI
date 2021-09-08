export const navigation = [
  {
    text: 'Inicio',
    path: '/inicio',
    icon: 'home',
    items: [],
    rolesMenu:[],
    visible: true
  },
  {
    text: 'Administración',
    icon: 'folder',
    visible: true,
    rolesMenu:[
      {
        rol: 'Admin'
      },
      {
        rol: 'User'
      }
    ],
    items: [
      {
        text: 'Agencias',
        path: '/agencias',
        roles:[
          {
            rol: 'Admin'
          },
          {
            rol:'User'
          }
        ],
        visible: true,
      },
      {
        text: 'Areas',
        path: '/areas',
        roles:[
          {
            rol: 'Admin'
          },
          {
            rol:'User'
          }
        ],
        visible: true,
      },
      {
        text: 'Objetivos',
        path: '/objetivos',
        roles:[
          {
            rol: 'Admin'
          }
        ],
        visible: true,
      },
      {
        text: 'Indicadores',
        path: '/indicadores',
        roles:[
          {
            rol: 'Admin'
          }
        ],
        visible: true,
      },
      {
        text: 'Tiempos',
        path: '/tiempos',
        roles:[
          {
            rol: 'Admin'
          },
          {
            rol:'User'
          }
        ],
        visible: true,
      },
    ]
  },
  {
    text: 'Admin Usuarios',
    icon: 'user',
    items: [{
      text: 'Usuarios',
      path: '/usuarios',
      roles:[
        {
          rol: 'Admin'
        }
      ],
      visible: true,
    },],
    rolesMenu:[
      {
        rol: 'Admin'
      }
    ],
    visible: true
  }
];
