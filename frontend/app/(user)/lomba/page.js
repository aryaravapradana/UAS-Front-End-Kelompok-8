'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useTransition } from '../context/TransitionContext';
import FadeInOnScroll from '../components/FadeInOnScroll';
import API from '@/lib/api';
import styles from './lomba.module.css';

async function getLomba() {
  const res = await fetch(API.lombas.list(), { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data from backend');
  }
  return res.json();
}

export default function LombaPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { endTransition } = useTransition();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const lombaData = await getLomba();
        setData(lombaData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        endTransition();
      }
    };
    fetchData();
  }, [endTransition]);

  return (
    <div className={styles.lombaPage}>
      <Header />
      <main className={`container ${styles.mainContainer}`}>
        <FadeInOnScroll>
          <h1 className={styles.title}>Daftar Lomba</h1>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <div className={`table-responsive ${styles.tableContainer}`}>
            <table className="table table-striped table-bordered mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Nama Lomba</th>
                  <th>Penyelenggara</th>
                  <th>Batasan Tahun</th>
                  <th>Batasan Prodi</th>
                  <th>Deadline</th>
                  <th>Biaya</th>
                  <th>Pemenang UCCD</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i}>
                        <td><div className="skeleton-text" style={{ width: '80%', height: '16px' }}></div></td>
                        <td><div className="skeleton-text" style={{ width: '70%', height: '16px' }}></div></td>
                        <td><div className="skeleton-text" style={{ width: '60%', height: '16px' }}></div></td>
                        <td><div className="skeleton-text" style={{ width: '60%', height: '16px' }}></div></td>
                        <td><div className="skeleton-text" style={{ width: '70%', height: '16px' }}></div></td>
                        <td><div className="skeleton-text" style={{ width: '50%', height: '16px' }}></div></td>
                        <td><div className="skeleton-text" style={{ width: '60%', height: '16px' }}></div></td>
                      </tr>
                    ))}
                  </>
                ) : data && data.length > 0 ? (
                  data.map((lomba) => (
                    <tr key={lomba.id}>
                      <td>{lomba.nama_lomba}</td>
                      <td>{lomba.penyelenggara}</td>
                      <td>{lomba.batasan_tahun}</td>
                      <td>{lomba.batasan_prodi}</td>
                      <td>{new Date(lomba.tanggal_deadline).toLocaleDateString()}</td>
                      <td>Rp {lomba.biaya_daftar ? parseInt(lomba.biaya_daftar).toLocaleString('id-ID') : '-'}</td>
                      <td>{lomba.pemenang_uccd}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">Tidak ada data lomba</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </FadeInOnScroll>
      </main>
    </div>
  );
}
