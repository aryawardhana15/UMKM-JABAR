const products = [
    // Bandung
    {
        id: 'Batik Bandung',
        name: 'Batik Tulis Khas Bandung',
        daerah: 'bandung',
        price: 'Rp 250.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Batik+Bandung',
        description: 'Batik tulis asli dari pengrajin Bandung dengan motif Parahyangan yang modern dan elegan.',
        rating: 4.8,
        sold: 120,
        stock: 50
    },
    {
        id: 'Keripik Maicih',
        name: 'Keripik Pedas Maicih',
        daerah: 'bandung',
        price: 'Rp 30.000',
        image: 'https://placehold.co/400x300/F9C74F/333333?text=Keripik+Maicih',
        description: 'Keripik singkong renyah dengan bumbu pedas legendaris yang akan membuatmu ketagihan.',
        rating: 4.9,
        sold: 1500,
        stock: 200
    },
    {
        id: 'Brownies Amanda',
        name: 'Brownies Kukus Amanda',
        daerah: 'bandung',
        price: 'Rp 55.000',
        image: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Brownies+Amanda',
        description: 'Brownies kukus legendaris dari Bandung dengan rasa cokelat yang kaya dan tekstur yang lembut.',
        rating: 4.9,
        sold: 2500,
        stock: 150
    },

    // Garut
    {
        id: 'Dodol Garut',
        name: 'Dodol Picnic Khas Garut',
        daerah: 'garut',
        price: 'Rp 25.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Dodol+Garut',
        description: 'Dodol Garut asli dengan berbagai varian rasa, oleh-oleh wajib khas kota Intan.',
        rating: 4.7,
        sold: 800,
        stock: 300
    },
    {
        id: 'Jaket Kulit Garut',
        name: 'Jaket Kulit Domba Asli',
        daerah: 'garut',
        price: 'Rp 1.200.000',
        image: 'https://placehold.co/400x300/333333/FFFFFF?text=Jaket+Kulit',
        description: 'Jaket kulit domba asli dari Sukaregang, Garut. Kualitas premium dengan desain modern.',
        rating: 4.9,
        sold: 90,
        stock: 40
    },

    // Cirebon
    {
        id: 'Batik Megamendung',
        name: 'Kain Batik Megamendung',
        daerah: 'cirebon',
        price: 'Rp 180.000',
        image: 'https://placehold.co/400x300/007BFF/FFFFFF?text=Batik+Megamendung',
        description: 'Kain batik dengan motif Megamendung ikonik dari Cirebon, melambangkan kemakmuran dan kesuburan.',
        rating: 4.8,
        sold: 250,
        stock: 100
    },
    {
        id: 'Terasi Cirebon',
        name: 'Terasi Udang Super',
        daerah: 'cirebon',
        price: 'Rp 15.000',
        image: 'https://placehold.co/400x300/D2691E/FFFFFF?text=Terasi',
        description: 'Terasi udang rebon kualitas super asli Cirebon, aroma kuat dan rasa yang khas.',
        rating: 4.9,
        sold: 1200,
        stock: 500
    },
    // Menambahkan lebih banyak produk untuk daerah lain untuk contoh
    {
        id: 'Tahu Sumedang',
        name: 'Tahu Sumedang Renyah',
        daerah: 'sumedang',
        price: 'Rp 20.000',
        image: 'https://placehold.co/400x300/F9C74F/333333?text=Tahu+Sumedang',
        description: 'Tahu Sumedang asli, renyah di luar dan lembut di dalam. Disajikan dengan lontong dan cengek.',
        rating: 4.9,
        sold: 3000,
        stock: 100
    },
    {
        id: 'Asinan Bogor',
        name: 'Asinan Buah & Sayur Bogor',
        daerah: 'bogor',
        price: 'Rp 35.000',
        image: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Asinan+Bogor',
        description: 'Asinan segar khas Bogor, perpaduan buah dan sayur dengan kuah cuka yang pedas dan menyegarkan.',
        rating: 4.7,
        sold: 750,
        stock: 80
    },

    // Karawang
    {
        id: 'Beras Organik Karawang',
        name: 'Beras Organik Pilihan',
        daerah: 'karawang',
        price: 'Rp 75.000',
        image: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Beras+Karawang',
        description: 'Beras organik langsung dari lumbung padi Jawa Barat, tanpa pestisida dan berkualitas tinggi.',
        rating: 4.8,
        sold: 450,
        stock: 200
    },

    // Tasikmalaya
    {
        id: 'Kelom Geulis Tasik',
        name: 'Kelom Geulis Modern',
        daerah: 'tasikmalaya',
        price: 'Rp 150.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Kelom+Geulis',
        description: 'Sandal kayu tradisional (kelom) dengan ukiran dan motif modern khas pengrajin Tasikmalaya.',
        rating: 4.7,
        sold: 180,
        stock: 70
    },

    // Sukabumi
    {
        id: 'Mochi Sukabumi',
        name: 'Mochi Kaswari Lampion',
        daerah: 'sukabumi',
        price: 'Rp 30.000',
        image: 'https://placehold.co/400x300/F9C74F/333333?text=Mochi+Sukabumi',
        description: 'Kue mochi legendaris dari Sukabumi dengan isian kacang tanah yang manis dan tekstur kenyal.',
        rating: 4.9,
        sold: 950,
        stock: 150
    },

    // Bekasi
    {
        id: 'Dodol Betawi Bekasi',
        name: 'Dodol Betawi Asli',
        daerah: 'bekasi',
        price: 'Rp 45.000',
        image: 'https://placehold.co/400x300/333333/FFFFFF?text=Dodol+Bekasi',
        description: 'Dodol khas Betawi dari Bekasi, dibuat dengan resep turun-temurun, legit dan lezat.',
        rating: 4.6,
        sold: 300,
        stock: 100
    },

    // Cimahi
    {
        id: 'Keripik Cimol Cimahi',
        name: 'Keripik Cimol Kering',
        daerah: 'cimahi',
        price: 'Rp 20.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Cimol+Cimahi',
        description: 'Cimol kering renyah dengan bumbu tabur aneka rasa, cemilan khas dari Cimahi.',
        rating: 4.7,
        sold: 600,
        stock: 250
    },

    // Banjar
    {
        id: 'Rangicok Banjar',
        name: 'Rangicok (Kacang Coklat)',
        daerah: 'banjar',
        price: 'Rp 22.000',
        image: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Rangicok+Banjar',
        description: 'Perpaduan unik antara kacang hijau dan coklat, cemilan manis dan renyah khas Kota Banjar.',
        rating: 4.8,
        sold: 400,
        stock: 120
    },

    // Cikarang (Kab. Bekasi)
    {
        id: 'Kue Akar Kelapa',
        name: 'Kue Akar Kelapa Cikarang',
        daerah: 'cikarang',
        price: 'Rp 25.000',
        image: 'https://placehold.co/400x300/F9C74F/333333?text=Akar+Kelapa',
        description: 'Kue kering tradisional dengan bentuk unik seperti akar kelapa, rasanya gurih dan renyah.',
        rating: 4.6,
        sold: 350,
        stock: 180
    },

    // Depok
    {
        id: 'Dodol Belimbing Depok',
        name: 'Dodol Belimbing Rasa Dewa',
        daerah: 'depok',
        price: 'Rp 35.000',
        image: 'https://placehold.co/400x300/333333/FFFFFF?text=Dodol+Belimbing',
        description: 'Inovasi dodol dengan rasa buah belimbing dewa yang segar dan unik, asli dari Depok.',
        rating: 4.7,
        sold: 550,
        stock: 130
    },
    
    // Purwakarta
    {
        id: 'Keramik Plered',
        name: 'Guci Keramik Plered',
        daerah: 'purwakarta',
        price: 'Rp 350.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Keramik+Plered',
        description: 'Kerajinan keramik berkualitas tinggi dari Plered, Purwakarta. Desain artistik dan fungsional.',
        rating: 4.9,
        sold: 80,
        stock: 30
    },
    {
        id: 'Simping Purwakarta',
        name: 'Simping Kaum Purwakarta',
        daerah: 'purwakarta',
        price: 'Rp 15.000',
        image: 'https://placehold.co/400x300/F9C74F/333333?text=Simping',
        description: 'Cemilan tipis dan renyah terbuat dari tepung tapioka dengan aneka rasa. Oleh-oleh khas Purwakarta.',
        rating: 4.8,
        sold: 1100,
        stock: 300
    },

    // Subang
    {
        id: 'Dodol Nanas Subang',
        name: 'Dodol Nanas Madu',
        daerah: 'subang',
        price: 'Rp 28.000',
        image: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Dodol+Nanas',
        description: 'Dodol legit dengan rasa manis asam segar dari nanas madu asli Subang.',
        rating: 4.7,
        sold: 700,
        stock: 150
    },
    
    // Indramayu
    {
        id: 'Sirup Mangga Gedong Gincu',
        name: 'Sirup Mangga Gedong Gincu',
        daerah: 'indramayu',
        price: 'Rp 40.000',
        image: 'https://placehold.co/400x300/333333/FFFFFF?text=Sirup+Mangga',
        description: 'Sirup premium yang terbuat dari ekstrak mangga Gedong Gincu pilihan asli Indramayu.',
        rating: 4.8,
        sold: 500,
        stock: 100
    },

    // Majalengka
    {
        id: 'Kecap Majalengka',
        name: 'Kecap Manis No.1 Majalengka',
        daerah: 'majalengka',
        price: 'Rp 20.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Kecap+Majalengka',
        description: 'Kecap manis legendaris dari Majalengka, dibuat secara tradisional untuk menjaga kualitas rasa.',
        rating: 4.9,
        sold: 1300,
        stock: 400
    },

    // Kuningan
    {
        id: 'Tape Ketan Kuningan',
        name: 'Tape Ketan Ember',
        daerah: 'kuningan',
        price: 'Rp 50.000',
        image: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Tape+Kuningan',
        description: 'Tape ketan hitam yang difermentasi dalam ember, menghasilkan rasa manis dan sedikit beralkohol yang khas.',
        rating: 4.8,
        sold: 650,
        stock: 90
    },
    
    // Ciamis
    {
        id: 'Galendo Ciamis',
        name: 'Galendo Asli Ciamis',
        daerah: 'ciamis',
        price: 'Rp 25.000',
        image: 'https://placehold.co/400x300/F9C74F/333333?text=Galendo',
        description: 'Makanan khas Ciamis yang terbuat dari endapan minyak kelapa, rasanya gurih dan manis.',
        rating: 4.7,
        sold: 850,
        stock: 180
    },
    
    // Pangandaran
    {
        id: 'Jambal Roti Pangandaran',
        name: 'Ikan Asin Jambal Roti',
        daerah: 'pangandaran',
        price: 'Rp 60.000',
        image: 'https://placehold.co/400x300/333333/FFFFFF?text=Jambal+Roti',
        description: 'Ikan asin kualitas super dari Pangandaran, berdaging tebal dan tidak terlalu asin. Cocok untuk lauk.',
        rating: 4.9,
        sold: 700,
        stock: 120
    },

    // Bandung (sudah ada 3)
    // Garut (sudah ada 2)
    // Cirebon (sudah ada 2)
    // Sumedang (sudah ada 1)
    {
        id: 'Oncom Sumedang',
        name: 'Oncom Sumedang Asli',
        daerah: 'sumedang',
        price: 'Rp 18.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Oncom+Sumedang',
        description: 'Oncom khas Sumedang, cocok untuk lauk atau cemilan, gurih dan nikmat.',
        rating: 4.8,
        sold: 900,
        stock: 80
    },
    // Bogor (sudah ada 1)
    {
        id: 'Talubi Bogor',
        name: 'Talubi (Talas Lapis Bogor)',
        daerah: 'bogor',
        price: 'Rp 40.000',
        image: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Talubi+Bogor',
        description: 'Kue lapis berbahan dasar talas asli Bogor, lembut dan manis.',
        rating: 4.8,
        sold: 600,
        stock: 60
    },
    // Karawang (sudah ada 1)
    {
        id: 'Kerupuk Kulit Karawang',
        name: 'Kerupuk Kulit Sapi Karawang',
        daerah: 'karawang',
        price: 'Rp 32.000',
        image: 'https://placehold.co/400x300/F9C74F/333333?text=Kerupuk+Kulit',
        description: 'Kerupuk kulit sapi renyah, oleh-oleh khas Karawang yang gurih.',
        rating: 4.7,
        sold: 300,
        stock: 90
    },
    // Tasikmalaya (sudah ada 1)
    {
        id: 'Payung Geulis Tasik',
        name: 'Payung Geulis Tradisional',
        daerah: 'tasikmalaya',
        price: 'Rp 120.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Payung+Geulis',
        description: 'Payung hias tradisional dengan lukisan tangan khas Tasikmalaya.',
        rating: 4.8,
        sold: 110,
        stock: 40
    },
    // Sukabumi (sudah ada 1)
    {
        id: 'Roti Priangan Sukabumi',
        name: 'Roti Priangan Legendaris',
        daerah: 'sukabumi',
        price: 'Rp 28.000',
        image: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Roti+Priangan',
        description: 'Roti klasik khas Sukabumi, lembut dan manis, cocok untuk oleh-oleh.',
        rating: 4.7,
        sold: 500,
        stock: 70
    },
    // Bekasi (sudah ada 1)
    {
        id: 'Kue Sagon Bekasi',
        name: 'Kue Sagon Tradisional',
        daerah: 'bekasi',
        price: 'Rp 20.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Sagon+Bekasi',
        description: 'Kue sagon kelapa khas Bekasi, gurih dan renyah.',
        rating: 4.6,
        sold: 200,
        stock: 60
    },
    // Cimahi (sudah ada 1)
    {
        id: 'Brownies Mini Cimahi',
        name: 'Brownies Mini Kering',
        daerah: 'cimahi',
        price: 'Rp 18.000',
        image: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Brownies+Cimahi',
        description: 'Brownies mini kering, camilan manis khas Cimahi.',
        rating: 4.7,
        sold: 250,
        stock: 80
    },
    // Banjar (sudah ada 1)
    {
        id: 'Opak Banjar',
        name: 'Opak Ketan Banjar',
        daerah: 'banjar',
        price: 'Rp 15.000',
        image: 'https://placehold.co/400x300/F9C74F/333333?text=Opak+Banjar',
        description: 'Opak ketan renyah, camilan tradisional khas Banjar.',
        rating: 4.7,
        sold: 180,
        stock: 50
    },
    // Cikarang (sudah ada 1)
    {
        id: 'Kue Satu Cikarang',
        name: 'Kue Satu Kacang Hijau',
        daerah: 'cikarang',
        price: 'Rp 18.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Kue+Satu',
        description: 'Kue kering dari kacang hijau, khas Cikarang.',
        rating: 4.6,
        sold: 120,
        stock: 40
    },
    // Depok (sudah ada 1)
    {
        id: 'Keripik Belimbing Depok',
        name: 'Keripik Belimbing Manis',
        daerah: 'depok',
        price: 'Rp 22.000',
        image: 'https://placehold.co/400x300/F9C74F/333333?text=Keripik+Belimbing',
        description: 'Keripik buah belimbing, inovasi UMKM Depok.',
        rating: 4.7,
        sold: 140,
        stock: 50
    },
    // Purwakarta (sudah ada 2)
    // Subang (sudah ada 1)
    {
        id: 'Keripik Nanas Subang',
        name: 'Keripik Nanas Renyah',
        daerah: 'subang',
        price: 'Rp 18.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Keripik+Nanas',
        description: 'Keripik nanas manis dan renyah, oleh-oleh khas Subang.',
        rating: 4.7,
        sold: 220,
        stock: 60
    },
    // Indramayu (sudah ada 1)
    {
        id: 'Kerupuk Kulit Ikan Indramayu',
        name: 'Kerupuk Kulit Ikan',
        daerah: 'indramayu',
        price: 'Rp 22.000',
        image: 'https://placehold.co/400x300/F9C74F/333333?text=Kerupuk+Ikan',
        description: 'Kerupuk kulit ikan gurih, khas pesisir Indramayu.',
        rating: 4.7,
        sold: 180,
        stock: 50
    },
    // Majalengka (sudah ada 1)
    {
        id: 'Emping Majalengka',
        name: 'Emping Melinjo Majalengka',
        daerah: 'majalengka',
        price: 'Rp 28.000',
        image: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Emping+Majalengka',
        description: 'Emping melinjo renyah, oleh-oleh khas Majalengka.',
        rating: 4.7,
        sold: 210,
        stock: 70
    },
    // Kuningan (sudah ada 1)
    {
        id: 'Keripik Gadung Kuningan',
        name: 'Keripik Gadung Pedas',
        daerah: 'kuningan',
        price: 'Rp 20.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Keripik+Gadung',
        description: 'Keripik gadung pedas, camilan khas Kuningan.',
        rating: 4.7,
        sold: 160,
        stock: 50
    },
    // Ciamis (sudah ada 1)
    {
        id: 'Sale Pisang Ciamis',
        name: 'Sale Pisang Asli',
        daerah: 'ciamis',
        price: 'Rp 18.000',
        image: 'https://placehold.co/400x300/6B8E23/FFFFFF?text=Sale+Ciamis',
        description: 'Sale pisang manis dan legit, khas Ciamis.',
        rating: 4.7,
        sold: 130,
        stock: 40
    },
    // Pangandaran (sudah ada 1)
    {
        id: 'Kerupuk Udang Pangandaran',
        name: 'Kerupuk Udang Laut',
        daerah: 'pangandaran',
        price: 'Rp 20.000',
        image: 'https://placehold.co/400x300/A05A2C/FFFFFF?text=Kerupuk+Udang',
        description: 'Kerupuk udang renyah, oleh-oleh khas Pangandaran.',
        rating: 4.7,
        sold: 110,
        stock: 30
    }
]; 

window.products = products; 