export const navigation = [
  {
    text: 'Inicio',
    path: '/inicio',
    icon: 'home',
    items: [],
    visible: true
  },
  {
    text: 'Administración',
    icon: 'folder',
    visible: true,
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
  }
];
