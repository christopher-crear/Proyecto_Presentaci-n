let cart = []; // Variable global para almacenar los elementos del carrito
let history = []; // Variable global para almacenar el historial de compras
let cartOpen = false; // Estado para saber si el modal del carrito está abierto
let currentTab = 'cart'; // Pestaña actual seleccionada ('cart' o 'history')

// Función para alternar la visibilidad del modal del carrito
function toggleCart() {
    cartOpen = !cartOpen;
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active', cartOpen);
}

// Función para cambiar entre las pestañas (Carrito/Historial)
function switchTab(tab) {
    currentTab = tab;
    // Oculta todas las pestañas y contenidos
    document.querySelectorAll('.cart-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.cart-content').forEach(c => c.classList.remove('active'));

    // Muestra la pestaña y contenido activos
    if (tab === 'cart') {
        document.querySelectorAll('.cart-tab')[0].classList.add('active');
        document.getElementById('cartContent').classList.add('active');
    } else {
        document.querySelectorAll('.cart-tab')[1].classList.add('active');
        document.getElementById('historyContent').classList.add('active');
        renderHistory(); // Renderiza el historial al cambiar de pestaña
    }
}

// Función para añadir un artículo al carrito
function addToCart(name, price, icon) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // Si ya existe, incrementa la cantidad
        existingItem.quantity++;
    } else {
        // Si no existe, lo añade como un nuevo elemento
        cart.push({
            name,
            price,
            icon,
            quantity: 1
        });
    }

    updateCart(); // Actualiza la vista del carrito

    // Animación de feedback en el badge
    const badge = document.getElementById('cartBadge');
    badge.style.animation = 'none';
    setTimeout(() => {
        badge.style.animation = 'pulse 0.5s ease';
    }, 10);
}

// Función para eliminar un artículo del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Función para actualizar la cantidad de un artículo
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        removeFromCart(index);
    } else {
        updateCart();
    }
}

// Función principal para renderizar y calcular el carrito
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartSummary = document.getElementById('cartSummary');

    // Calcula el número total de artículos
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    if (cart.length === 0) {
        // Si el carrito está vacío, muestra el mensaje correspondiente
        cartItems.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">🛒</div>
                        <p>Tu carrito está vacío</p>
                    </div>
                `;
        cartSummary.style.display = 'none';
    } else {
        // Si hay elementos, renderiza la lista
        cartItems.innerHTML = cart.map((item, index) => `
                    <div class="cart-item">
                        <div class="item-icon">${item.icon}</div>
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-quantity">
                                <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                                <span class="qty-value">${item.quantity}</span>
                                <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                            </div>
                            <button class="remove-item" onclick="removeFromCart(${index})">Eliminar</button>
                        </div>
                        <div class="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `).join('');
        cartSummary.style.display = 'block';

        // Calcula subtotal, IVA (12%) y total
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.12;
        const total = subtotal + tax;

        // Actualiza el resumen
        document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `${total.toFixed(2)}`;
    }
}

// Función de proceso de pago
function checkout() {
    if (cart.length === 0) return;

    // Recalcula el total final (por si acaso)
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    // Crea el objeto de compra para el historial
    const purchase = {
        date: new Date().toLocaleString('es-EC', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        items: [...cart], // Copia los elementos del carrito
        subtotal,
        tax,
        total
    };

    history.unshift(purchase); // Agrega la compra al inicio del historial
    cart = []; // Vacía el carrito
    updateCart(); // Actualiza la vista del carrito (que ahora estará vacío)

    alert('¡Compra realizada con éxito! Revisa tu historial de compras.');
    switchTab('history'); // Cambia a la pestaña de historial
}

// Función para renderizar el historial de compras
function renderHistory() {
    const historyItems = document.getElementById('historyItems');

    if (history.length === 0) {
        historyItems.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">📋</div>
                        <p>No tienes compras anteriores</p>
                    </div>
                `;
    } else {
        // Mapea el historial para mostrar cada compra
        historyItems.innerHTML = history.map((purchase, index) => `
                    <div class="history-item">
                        <div class="history-header">
                            <div>
                                <div style="font-weight: 700; margin-bottom: 5px;">Compra #${history.length - index}</div>
                                <div class="history-date">${purchase.date}</div>
                            </div>
                            <div class="history-total">${purchase.total.toFixed(2)}</div>
                        </div>
                        <div class="history-items">
                            ${purchase.items.map(item => `
                                • ${item.icon} ${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                            `).join('<br>')}
                        </div>
                    </div>
                `).join('');
    }
}

// Cierra el carrito al hacer clic fuera de él
document.addEventListener('click', function (e) {
    const modal = document.getElementById('cartModal');
    const cartBtn = document.querySelector('.cart-btn');

    if (cartOpen && !modal.contains(e.target) && !cartBtn.contains(e.target)) {
        toggleCart();
    }
});

// Animación de entrada para las cards de servicio
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.servicio-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});