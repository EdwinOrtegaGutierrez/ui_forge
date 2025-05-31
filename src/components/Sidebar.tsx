import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Skeleton } from 'primereact/skeleton';
import Image from 'next/image';
import style from './SidebarStyle.module.css';

type MenuItem = {
    nombre: string;
    icono?: string;
    funcion?: () => void;
    badge?: React.ReactNode;
    submenu?: MenuItem[];
};

export default function SidebarUI() {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Simula carga de datos por 2 segundos
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Maneja abrir/cerrar submenús según el nombre
    const toggleOpen = (key: string) => {
        setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Define el menú como un array de objetos
    const menu: MenuItem[] = [
        // {
        //     nombre: 'FAVORITES',
        //     icono: 'pi pi-star',
        //     submenu: [
        //         { nombre: 'Dashboard', icono: 'pi pi-home', funcion: () => alert('Dashboard clicked') },
        //         { nombre: 'Bookmarks', icono: 'pi pi-bookmark' },
        //         {
        //             nombre: 'Reports',
        //             icono: 'pi pi-chart-line',
        //             submenu: [
        //                 {
        //                     nombre: 'Revenue',
        //                     icono: 'pi pi-chart-line',
        //                     submenu: [
        //                         { nombre: 'View', icono: 'pi pi-table' },
        //                         { nombre: 'Search', icono: 'pi pi-search' },
        //                     ],
        //                 },
        //                 { nombre: 'Expenses', icono: 'pi pi-chart-line' },
        //             ],
        //         },
        //         { nombre: 'Team', icono: 'pi pi-users' },
        //         { nombre: 'Messages', icono: 'pi pi-comments', badge: '3' },
        //         { nombre: 'Calendar', icono: 'pi pi-calendar' },
        //         { nombre: 'Settings', icono: 'pi pi-cog' },
        //     ],
        // },
        {
            nombre:"INICIO",
            icono: 'pi pi-home',
            funcion: () => alert('Inicio clicked'),
        },
        {
            nombre: "ADMINISTRACIÓN",
            icono: 'pi pi-cog',
            submenu: [
                { nombre: 'Empresas', icono: 'pi pi-building', funcion: () => alert('Empresas clicked') },
                { nombre: 'Usuarios', icono: 'pi pi-users', funcion: () => alert('Usuarios clicked') },
                { nombre: 'Roles', icono: 'pi pi-shield', funcion: () => alert('Roles clicked') },
                { nombre: 'Departamentos', icono: 'pi pi-folder', funcion: () => alert('Departamentos clicked') }
            ],
        },
        {
            nombre: "VENTAS",
            icono: 'pi pi-chart-line',
            submenu: [
                { nombre: 'Alta Lead', icono: 'pi pi-file', funcion: () => alert('Usuarios clicked') },
                { nombre: 'Roles', icono: 'pi pi-file-plus', funcion: () => alert('Roles clicked') },
                { nombre: 'Departamentos', icono: 'pi pi-calendar', funcion: () => alert('Departamentos clicked') }
            ],
        },
        {
            nombre: "PRODUCCIÓN",
            icono: 'pi pi-box',
            submenu: [
                { nombre: 'Plan de producción', icono: 'pi pi-file-edit', funcion: () => alert('Usuarios clicked') },
            ],
        },
        {
            nombre: "E COMMERCE",
            icono: 'pi pi-globe',
            submenu: [
                { nombre: 'E Commerce', icono: 'pi pi-globe', funcion: () => alert('Usuarios clicked') },
                { nombre: 'Mis Pedidos', icono: 'pi pi-shopping-cart', funcion: () => alert('Usuarios clicked') },
            ],
        },
        {
            nombre: "INCIDENCIAS",
            icono: 'pi pi-shield',
            submenu: [
                { nombre: 'Incidencias', icono: 'pi pi-shield', funcion: () => alert('Usuarios clicked') },
                { nombre: 'Reportes', icono: 'pi pi-book', funcion: () => alert('Usuarios clicked') },
            ],
        }
    ];

    const styles = {
        listItem: {
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '0.375rem',
            color: '#4a4a4a',
            transition: 'background-color 0.15s ease-in-out',
            userSelect: 'none',
            position: 'relative',
            justifyContent: 'space-between',
            
        },
        nestedList: {
            listStyleType: 'none',
            paddingLeft: '1.25rem',
            marginTop: 0,
            marginBottom: 0,
            overflow: 'hidden',
        },
        badge: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 'auto',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '9999px',
            minWidth: '1.5rem',
            height: '1.5rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            userSelect: 'none',
            padding: '0 0.4rem',
        },
        iconMarginRight: {
            marginRight: '0.5rem',
        },
        fontMedium: {
            fontWeight: 500,
            flexGrow: 1,
        },
    };

    // Renderiza el menú recursivamente
    const renderMenu = (items: MenuItem[], parentKey = '') => {
        return (
            <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
                {items.map((item, idx) => {
                    const key = parentKey + idx;
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    const isOpen = openItems[key] || false;

                    return (
                        <li key={key} className={isOpen ? style.listItemTitle : style.listItem}>
                            <div
                                onClick={() => {
                                    if (hasSubmenu) {
                                        toggleOpen(key);
                                    }
                                    if (item.funcion && !hasSubmenu) {
                                        item.funcion();
                                    }
                                }}
                                style={{
                                    ...styles.listItem,
                                    backgroundColor: isOpen ? '#e2e8f0' : 'transparent',
                                    color: isOpen ? '#1e40af' : '#4a4a4a',
                                    borderLeft: isOpen ? '4px solid #2563eb' : 'none',
                                    boxShadow: isOpen ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
                                    fontWeight: isOpen ? 600 : 500,
                                    transition: 'background-color 0.2s ease, color 0.2s ease',
                                    
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    userSelect: 'none',
                                    position: 'relative',
                                    gap: '0.5rem',
                                    
                                
                                }}
                            >
                                {item.icono && <i className={item.icono} style={styles.iconMarginRight} />}
                                <span style={styles.fontMedium}>{item.nombre}</span>
                                {item.badge && <span style={styles.badge}>{item.badge}</span>}
                                {hasSubmenu && <i className={`pi pi-chevron-${isOpen ? 'down' : 'right'}`} />}
                                
                            </div>
                            {hasSubmenu && isOpen && (
                                <div style={styles.nestedList}>{renderMenu(item.submenu!, key + '-')}</div>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <>
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                content={() => (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',     // Para alinear verticalmente arriba
                                justifyContent: 'center',     // Para centrar horizontalmente
                                padding: '1rem',
                                borderBottom: '1px solid #ccc',
                                marginBottom: '1rem',
                                gap: '1rem',
                            }}
                        >
                            <Image
                                src="/logo.jpg"
                                alt="Logo"
                                width={"250"}
                                height={"100"}
                                style={{ borderRadius: '8px', objectFit: 'cover' }}
                            />
                            <Button
                                onClick={() => setVisible(false)}
                                icon="pi pi-times"
                                rounded
                                outlined
                                severity="danger"
                                style={{ width: '40px', height: '40px' }}
                            />
                        </div>

                        <div style={{ overflowY: 'auto', maxHeight: '75vh', padding: '0 1rem' }}>
                            {renderMenu(menu)}
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderTop: '1px solid #ccc', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                                <Avatar icon="pi pi-user" size="large" shape="circle" />
                                {/* <Avatar
                                    image="https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png"
                                    shape="circle"
                                /> */}
                                <span style={{ fontWeight: '700' }}>Amy Elsner</span>
                            </a>
                        </div>
                    </div>
                )}
            />
            <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alingContent:'center', gap:'20px'  }}>
                {loading ? (
                    <Skeleton  width='110px' height='50px'/> 
                ) : (
                    <Button
                        severity="info" text raised 
                        icon="pi pi-bars"
                        onClick={() => setVisible(true)}
                        style={{ width: '110px', height: '50px' }}
                        label='Menú'
                    />
                )} 

                {loading ? (
                    <Skeleton  width='110px' height='50px'/> 
                ) : (
                    <Button
                        text raised 
                        icon="pi pi-user"
                        onClick={() => {
                            alert('Perfil clicked'); // Aquí puedes redirigir a la página de perfil
                        }}
                        style={{  width: '110px', height: '50px' }}
                        label='Perfil'
                    />                    
                )} 

                {loading ? (
                    <Skeleton  width='110px' height='50px'/> 
                ) : (    
                    <Button
                        severity="danger" text raised 
                        icon="pi pi-sign-out"
                        onClick={() => {
                            router.push('/'); // Redirige a la página de inicio
                        }}
                        style={{ width: '110px', height: '50px' }}
                        label='Salir'
                    />
                )} 
                
            </div>
        </>
    );
}
