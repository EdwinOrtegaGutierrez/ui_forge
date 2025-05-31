"use client";
import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';

import Image from 'next/image';
import styles from './dashboard.module.css';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simula carga de datos por 2 segundos
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div className='box'>
            <Card> 
                <div className={styles.content}>
                    {loading ? (
                        <Skeleton shape="circle" size="4rem" />
                    ) : (
                        <Avatar
                            icon="pi pi-user"
                            size="xlarge"
                            shape="circle"
                            className={styles.avatar}
                        />
                    )}

                    <Divider />
                    <h1 className={styles.title}>¡Bienvenido de nuevo!</h1>
                    {loading ? (
                        <Skeleton width="400px" height='200px' />
                    ) : (
                        <Image
                            src="/logo.jpg"
                            alt="Logo de la aplicación"
                            width={400}
                            height={200}
                            className='logo-image'
                        />                        
                    )}
                   
                    <Divider />

                    <p className={styles.subtitle}>
                        Te damos la bienvenida a tu panel de control.
                    </p>
                </div>
            </Card>
        </div>
    );
}
