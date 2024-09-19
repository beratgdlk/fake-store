// Asenkron bir fonksiyon tanımlıyoruz. Bu fonksiyon, dış bir API'den veri almak için fetch metodunu kullanacak.
async function fetchProducts() {
    try {
        // Fetch metodunu kullanarak "fakestoreapi.com" adresinden ürün verilerini almaya çalışıyoruz.
        // Bu işlem bir Promise döndüreceği için "await" ile işlemin tamamlanmasını bekliyoruz.
        const response = await fetch("https://fakestoreapi.com/products");

        // Gelen yanıtı JSON formatına dönüştürüyoruz. Yine bu işlem asenkron olduğu için "await" kullanıyoruz.
        const products = await response.json();

        // Ürün verilerini konsola yazdırıyoruz.
        console.log(products);

        // Veriyi fonksiyon dışına döndürüyoruz, böylece başka yerlerde de kullanılabilir.
        return products;

    } catch (error) {
        // Eğer API isteğinde bir hata oluşursa, bu blok çalışacak ve hatayı konsola yazdıracak.
        console.error("API Hatası: ", error);
    }
}

// Ürünleri alıp listeye yerleştiren fonksiyon.
const renderProducts = (products) => {
    // "product-list" id'sine sahip HTML öğesini seçiyoruz (bu bir <ul> ya da <ol> olabilir).
    const productList = document.getElementById("product-list");

    // Her ürün için bir <li> öğesi oluşturup bunları ekrana yerleştirmek için map fonksiyonunu kullanıyoruz.
    const productItems = products.map((product) => {
        // Yeni bir <li> elementi oluşturuyoruz.
        const li = document.createElement("li");

        // Ürün fiyatını %20 artırarak yeni bir fiyat oluşturuyoruz.
        const increasedPrice = (product.price * 1.2).toFixed(2);

        // Ürün ismi ve artırılmış fiyatı <li> içine ekliyoruz.
        li.textContent = `${product.title} - Yeni Fiyat: $${increasedPrice}`;

        // Her bir <li> öğesini döndürüyoruz.
        return li;
    });

    // Tüm oluşturulan <li> öğelerini ürün listesine ekliyoruz.
    productItems.forEach((item) => productList.appendChild(item));

    // Fiyat kontrolü yapıp, fiyatı 100'den fazla olan ürünlere "expensive" sınıfını ekliyoruz.
    productItems.forEach((item) => {
        // item.textContent: <li> öğesinin içindeki metni alıyoruz.
        const price = parseFloat(item.textContent.split("$")[1]);
        
        // Eğer fiyat 100'den büyükse "expensive" sınıfını ekliyoruz.
        if (price > 100) {
            item.classList.add("expensive");
        }

        // Fiyatı konsola yazdırıyoruz.
        console.log(price);
    });
};

// API'den ürün verilerini aldıktan sonra renderProducts fonksiyonuna gönderiyoruz.
fetchProducts().then((products) => {
    renderProducts(products);
});
