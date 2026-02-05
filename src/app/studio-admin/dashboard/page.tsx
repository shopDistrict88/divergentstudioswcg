"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Package,
  FileText,
  ShoppingCart,
  Music,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Upload,
  Calendar,
  Users,
  TrendingUp,
  Bell,
  Palette,
  Globe,
  Tag,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { useAudio } from "@/context/audio-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type TabType = "overview" | "products" | "content" | "drops" | "orders" | "audio" | "settings";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  sizes: string[];
  images: string[];
  status: "active" | "draft" | "sold-out";
}

interface Drop {
  id: string;
  name: string;
  date: string;
  products: string[];
  status: "upcoming" | "live" | "ended";
}

interface Order {
  id: string;
  customer: string;
  email: string;
  items: { name: string; size: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
}

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  announcementText: string;
  aboutText: string;
}

const defaultContent: SiteContent = {
  heroTitle: "Divergent Studios",
  heroSubtitle: "Wearable art. Limited exhibitions.",
  announcementText: "EXHIBITION 001: NOVA — Now Live",
  aboutText: "",
};

// Helper functions for localStorage
function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("divergent-products");
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function getStoredDrops(): Drop[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("divergent-drops");
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("divergent-orders");
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function getStoredContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const saved = localStorage.getItem("divergent-content");
    return saved ? JSON.parse(saved) : defaultContent;
  } catch { return defaultContent; }
}

export default function AdminDashboardPage() {
  const { isAuthenticated, logout } = useAdmin();
  const { tracks } = useAudio();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  
  // Use useSyncExternalStore for initial data loading
  const storedProducts = useSyncExternalStore(subscribeToStorage, getStoredProducts, () => []);
  const storedDrops = useSyncExternalStore(subscribeToStorage, getStoredDrops, () => []);
  const storedOrders = useSyncExternalStore(subscribeToStorage, getStoredOrders, () => []);
  const storedContent = useSyncExternalStore(subscribeToStorage, getStoredContent, () => defaultContent);
  
  // State for different sections (initialized from storage)
  const [products, setProducts] = useState<Product[]>(storedProducts);
  const [drops, setDrops] = useState<Drop[]>(storedDrops);
  const [orders] = useState<Order[]>(storedOrders);
  const [content, setContent] = useState<SiteContent>(storedContent);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/studio-admin/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/studio-admin/login");
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "products", label: "Products", icon: <Package className="h-4 w-4" /> },
    { id: "content", label: "Content", icon: <FileText className="h-4 w-4" /> },
    { id: "drops", label: "Drops", icon: <Calendar className="h-4 w-4" /> },
    { id: "orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" /> },
    { id: "audio", label: "Audio", icon: <Music className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Top Bar */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-white">
              Studio Admin
            </h1>
            <span className="rounded-full bg-[var(--accent)]/20 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[var(--accent)]">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-white/60 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[9px]">
                3
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/60 transition hover:border-white/30 hover:text-white"
            >
              <LogOut className="h-3 w-3" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-white/10 bg-black/50 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-xs uppercase tracking-wider transition ${
                  activeTab === tab.id
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider text-white/50">
                Quick Stats
              </p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/40">Products</span>
                  <span className="text-xs font-bold text-white">{products.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/40">Orders</span>
                  <span className="text-xs font-bold text-white">{orders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/40">Tracks</span>
                  <span className="text-xs font-bold text-white">{tracks.length}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "overview" && <OverviewTab products={products} orders={orders} drops={drops} />}
              {activeTab === "products" && <ProductsTab products={products} setProducts={setProducts} />}
              {activeTab === "content" && <ContentTab content={content} setContent={setContent} />}
              {activeTab === "drops" && <DropsTab drops={drops} setDrops={setDrops} products={products} />}
              {activeTab === "orders" && <OrdersTab orders={orders} />}
              {activeTab === "audio" && <AudioTab />}
              {activeTab === "settings" && <SettingsTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab({ products, orders, drops }: { products: Product[]; orders: Order[]; drops: Drop[] }) {
  const stats = [
    { label: "Total Products", value: products.length, icon: <Package className="h-5 w-5" />, change: "+12%" },
    { label: "Total Orders", value: orders.length, icon: <ShoppingCart className="h-5 w-5" />, change: "+8%" },
    { label: "Active Drops", value: drops.filter(d => d.status === "live").length, icon: <Calendar className="h-5 w-5" />, change: "0" },
    { label: "Revenue", value: "$0", icon: <TrendingUp className="h-5 w-5" />, change: "--" },
  ];

  return (
    <div>
      <h2 className="mb-6 text-lg font-bold uppercase tracking-[0.2em] text-white">Dashboard Overview</h2>
      
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div className="text-white/50">{stat.icon}</div>
              <span className="text-[10px] text-green-500">{stat.change}</span>
            </div>
            <p className="mt-4 text-2xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-white/60">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>System ready for orders</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/60">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span>Connect Stripe for payments</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/60">
              <Package className="h-4 w-4 text-blue-500" />
              <span>Add products to get started</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Quick Actions</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button variant="secondary" className="justify-start text-xs">
              <Plus className="mr-2 h-3 w-3" /> Add Product
            </Button>
            <Button variant="secondary" className="justify-start text-xs">
              <Calendar className="mr-2 h-3 w-3" /> Schedule Drop
            </Button>
            <Button variant="secondary" className="justify-start text-xs">
              <Music className="mr-2 h-3 w-3" /> Upload Audio
            </Button>
            <Button variant="secondary" className="justify-start text-xs">
              <FileText className="mr-2 h-3 w-3" /> Edit Content
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Products Tab
function ProductsTab({ products, setProducts }: { products: Product[]; setProducts: (p: Product[]) => void }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    sizes: "S, M, L, XL",
    status: "draft" as Product["status"],
  });

  const handleSave = () => {
    const newProduct: Product = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      description: formData.description,
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      images: [],
      status: formData.status,
    };

    let updated: Product[];
    if (editingId) {
      updated = products.map((p) => (p.id === editingId ? newProduct : p));
    } else {
      updated = [...products, newProduct];
    }

    setProducts(updated);
    localStorage.setItem("divergent-products", JSON.stringify(updated));
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", price: "", description: "", sizes: "S, M, L, XL", status: "draft" });
  };

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("divergent-products", JSON.stringify(updated));
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      sizes: product.sizes.join(", "),
      status: product.status,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-white">Products</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-lg border border-white/10 bg-white/5 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {editingId ? "Edit Product" : "New Product"}
            </h3>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-white/50 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Product Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="NOVA Relic Hoodie"
              />
            </div>
            <div>
              <Label>Price ($)</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="185"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description..."
                rows={3}
              />
            </div>
            <div>
              <Label>Sizes (comma-separated)</Label>
              <Input
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                placeholder="S, M, L, XL"
              />
            </div>
            <div>
              <Label>Status</Label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Product["status"] })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="sold-out">Sold Out</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Product
            </Button>
            <Button variant="secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {products.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/20 p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-white/20" />
            <p className="mt-4 text-sm text-white/50">No products yet</p>
            <p className="text-xs text-white/30">Add your first product to get started</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                  <Package className="h-6 w-6 text-white/50" />
                </div>
                <div>
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-xs text-white/50">${product.price} • {product.sizes.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider ${
                    product.status === "active"
                      ? "bg-green-500/20 text-green-500"
                      : product.status === "sold-out"
                      ? "bg-red-500/20 text-red-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {product.status}
                </span>
                <button onClick={() => handleEdit(product)} className="text-white/50 hover:text-white">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(product.id)} className="text-white/50 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Content Tab
function ContentTab({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  const [localContent, setLocalContent] = useState(content);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setContent(localContent);
    localStorage.setItem("divergent-content", JSON.stringify(localContent));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-white">Site Content</h2>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <Globe className="h-4 w-4" /> Hero Section
          </h3>
          <div className="space-y-4">
            <div>
              <Label>Hero Title</Label>
              <Input
                value={localContent.heroTitle}
                onChange={(e) => setLocalContent({ ...localContent, heroTitle: e.target.value })}
              />
            </div>
            <div>
              <Label>Hero Subtitle</Label>
              <Input
                value={localContent.heroSubtitle}
                onChange={(e) => setLocalContent({ ...localContent, heroSubtitle: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <Bell className="h-4 w-4" /> Announcement Bar
          </h3>
          <div>
            <Label>Announcement Text</Label>
            <Input
              value={localContent.announcementText}
              onChange={(e) => setLocalContent({ ...localContent, announcementText: e.target.value })}
            />
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <FileText className="h-4 w-4" /> About Page
          </h3>
          <div>
            <Label>About Text</Label>
            <Textarea
              value={localContent.aboutText}
              onChange={(e) => setLocalContent({ ...localContent, aboutText: e.target.value })}
              rows={6}
              placeholder="Write about your brand..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Drops Tab
function DropsTab({ drops, setDrops, products }: { drops: Drop[]; setDrops: (d: Drop[]) => void; products: Product[] }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    status: "upcoming" as Drop["status"],
  });

  const handleSave = () => {
    const newDrop: Drop = {
      id: Date.now().toString(),
      name: formData.name,
      date: formData.date,
      products: [],
      status: formData.status,
    };

    const updated = [...drops, newDrop];
    setDrops(updated);
    localStorage.setItem("divergent-drops", JSON.stringify(updated));
    setShowForm(false);
    setFormData({ name: "", date: "", status: "upcoming" });
  };

  const handleDelete = (id: string) => {
    const updated = drops.filter((d) => d.id !== id);
    setDrops(updated);
    localStorage.setItem("divergent-drops", JSON.stringify(updated));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-white">Drops</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Schedule Drop
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-lg border border-white/10 bg-white/5 p-6"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Drop Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="NOVA Collection Drop"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <Label>Status</Label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Drop["status"] })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                <option value="upcoming">Upcoming</option>
                <option value="live">Live</option>
                <option value="ended">Ended</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Drop
            </Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {drops.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/20 p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-white/20" />
            <p className="mt-4 text-sm text-white/50">No drops scheduled</p>
          </div>
        ) : (
          drops.map((drop) => (
            <div
              key={drop.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                  <Calendar className="h-6 w-6 text-white/50" />
                </div>
                <div>
                  <p className="font-medium text-white">{drop.name}</p>
                  <p className="text-xs text-white/50">{drop.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider ${
                    drop.status === "live"
                      ? "bg-green-500/20 text-green-500"
                      : drop.status === "ended"
                      ? "bg-white/20 text-white/50"
                      : "bg-blue-500/20 text-blue-500"
                  }`}
                >
                  {drop.status}
                </span>
                <button onClick={() => handleDelete(drop.id)} className="text-white/50 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Orders Tab
function OrdersTab({ orders: _orders }: { orders: Order[] }) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-white">Orders</h2>
        <div className="flex gap-2">
          <Button variant="secondary">
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
        <ShoppingCart className="mx-auto h-12 w-12 text-white/20" />
        <p className="mt-4 text-sm text-white/50">No orders yet</p>
        <p className="text-xs text-white/30">Orders will appear here once you connect Stripe</p>
        <Button className="mt-6" variant="secondary">
          Connect Stripe
        </Button>
      </div>

      <div className="mt-6 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <div>
            <p className="text-sm font-medium text-yellow-500">Payment Integration Required</p>
            <p className="text-xs text-yellow-500/70">Connect Stripe to start accepting payments and managing orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Audio Tab
function AudioTab() {
  const { tracks, addTrack, removeTrack } = useAudio();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
    }
  };

  const handleSave = () => {
    if (formData.name && formData.artist) {
      // In a real app, you'd upload the file to a server
      // For now, we'll just add a placeholder
      addTrack({
        id: Date.now().toString(),
        name: formData.name,
        artist: formData.artist,
        src: formData.file ? URL.createObjectURL(formData.file) : "/audio/placeholder.mp3",
      });
      setShowForm(false);
      setFormData({ name: "", artist: "", file: null });
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-white">Audio Manager</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Track
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-lg border border-white/10 bg-white/5 p-6"
        >
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Add New Track</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Track Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ambient Drift"
              />
            </div>
            <div>
              <Label>Artist</Label>
              <Input
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                placeholder="Studio Beats"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Audio File (MP3, M4A, WAV)</Label>
              <div className="mt-1 flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-3 transition hover:border-white/40">
                  <Upload className="h-4 w-4 text-white/50" />
                  <span className="text-xs text-white/50">
                    {formData.file ? formData.file.name : "Choose file"}
                  </span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Track
            </Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {tracks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/20 p-12 text-center">
            <Music className="mx-auto h-12 w-12 text-white/20" />
            <p className="mt-4 text-sm text-white/50">No tracks added</p>
            <p className="text-xs text-white/30">Add audio files from your friends</p>
          </div>
        ) : (
          tracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)]/20">
                  <Music className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="font-medium text-white">{track.name}</p>
                  <p className="text-xs text-white/50">{track.artist}</p>
                </div>
              </div>
              <button onClick={() => removeTrack(track.id)} className="text-white/50 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <p className="text-xs text-white/50">
          <strong className="text-white">Tip:</strong> Upload MP3, M4A, or WAV files. Audio will play automatically when visitors enter the site (if they enable sound).
        </p>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab() {
  return (
    <div>
      <h2 className="mb-6 text-lg font-bold uppercase tracking-[0.2em] text-white">Settings</h2>

      <div className="space-y-6">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <Palette className="h-4 w-4" /> Brand Colors
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Accent Color</Label>
              <div className="flex items-center gap-3">
                <input type="color" defaultValue="#bd1640" className="h-10 w-20 rounded border-none bg-transparent" />
                <span className="text-xs text-white/50">#bd1640</span>
              </div>
            </div>
            <div>
              <Label>Background Color</Label>
              <div className="flex items-center gap-3">
                <input type="color" defaultValue="#050505" className="h-10 w-20 rounded border-none bg-transparent" />
                <span className="text-xs text-white/50">#050505</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <Globe className="h-4 w-4" /> Site Settings
          </h3>
          <div className="space-y-4">
            <div>
              <Label>Site Name</Label>
              <Input defaultValue="Divergent Studios" />
            </div>
            <div>
              <Label>Site Description</Label>
              <Textarea defaultValue="Wearable art. Limited exhibitions." rows={2} />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <Users className="h-4 w-4" /> Social Media
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Instagram URL</Label>
              <Input placeholder="https://instagram.com/..." />
            </div>
            <div>
              <Label>Twitter URL</Label>
              <Input placeholder="https://twitter.com/..." />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-500">
            <Tag className="h-4 w-4" /> Payment Integration
          </h3>
          <p className="mb-4 text-xs text-yellow-500/70">
            Connect Stripe to accept payments and automatically manage orders.
          </p>
          <Button>Connect Stripe</Button>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary">Reset to Defaults</Button>
          <Button>Save Settings</Button>
        </div>
      </div>
    </div>
  );
}
