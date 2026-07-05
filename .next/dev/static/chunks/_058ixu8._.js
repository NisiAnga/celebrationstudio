(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/googleSheets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_INVENTORY_ITEMS",
    ()=>DEFAULT_INVENTORY_ITEMS,
    "createAndPopulateSpreadsheet",
    ()=>createAndPopulateSpreadsheet,
    "findInventorySpreadsheet",
    ()=>findInventorySpreadsheet,
    "getInventoryFromSheet",
    ()=>getInventoryFromSheet,
    "updateSheetInventoryQuantities",
    ()=>updateSheetInventoryQuantities
]);
const DEFAULT_INVENTORY_ITEMS = [
    {
        id: 'item_1',
        name: 'Boho Terracotta Rose Arch',
        category: 'Backdrops',
        price: 150,
        stock: 3,
        available: 3,
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
        description: 'A grand hexagonal wooden backdrop draped in luxurious terracotta rose chiffon linens and adorned with dry pampas grass and blush florals.'
    },
    {
        id: 'item_2',
        name: 'Blush Beige Silk Runners (Set of 10)',
        category: 'Table Runners',
        price: 45,
        stock: 8,
        available: 8,
        image: 'https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?auto=format&fit=crop&q=80&w=600',
        description: 'Ultra-soft, flowing heavy silk table runners in a beautiful blush beige shade that pools elegantly at the ends of reception tables.'
    },
    {
        id: 'item_3',
        name: 'Camel Tan Velvet Lounge Sofa',
        category: 'Other',
        price: 280,
        stock: 2,
        available: 2,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
        description: 'A cozy yet luxury camel-colored velvet mid-century sofa, perfect for creating a warm and sophisticated lounge vignette for photos.'
    },
    {
        id: 'item_4',
        name: 'Aged Olive Ceramic Vases (Trio)',
        category: 'Other',
        price: 35,
        stock: 12,
        available: 12,
        image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600',
        description: 'Three hand-thrown earthenware vases of varying heights, finished in a distressed olive green glaze for a rustic-luxury touch.'
    },
    {
        id: 'item_5',
        name: 'Sage Blue Ribbed Glass Goblets (Set of 24)',
        category: 'Other',
        price: 60,
        stock: 10,
        available: 10,
        image: 'https://images.unsplash.com/photo-1574926053821-79c5e338a933?auto=format&fit=crop&q=80&w=600',
        description: 'Exquisite ribbed glassware in an elegant vintage sage blue tint, adding a refreshing hint of color to your table settings.'
    },
    {
        id: 'item_6',
        name: 'Terracotta Stoneware Dinner Set (24 pax)',
        category: 'Other',
        price: 90,
        stock: 6,
        available: 6,
        image: 'https://images.unsplash.com/photo-1535401991746-da3d9055713e?auto=format&fit=crop&q=80&w=600',
        description: 'Organic-edged artisanal matte plates and bowls in rich earthy terracotta, bringing warmth and modern craftsmanship to the table.'
    },
    {
        id: 'item_7',
        name: 'Cozy Rattan Armchair Vignette',
        category: 'Other',
        price: 110,
        stock: 4,
        available: 4,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600',
        description: 'A set of two hand-woven natural rattan peacock armchairs paired with blush beige organic linen cushions.'
    },
    {
        id: 'item_8',
        name: 'Camel Tan Leather Floor Cushions (Set of 4)',
        category: 'Other',
        price: 40,
        stock: 15,
        available: 15,
        image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600',
        description: 'Premium Moroccan camel leather floor poufs, stuffed firmly for comfortable low-seating arrangements around coffee tables.'
    },
    {
        id: 'item_9',
        name: 'Minimalist Brass Taper Candle Holders',
        category: 'Other',
        price: 25,
        stock: 20,
        available: 20,
        image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600',
        description: 'Set of six slender brass candlesticks of graduated heights. Classic, elegant, and matches any cozy tablescape.'
    },
    {
        id: 'item_10',
        name: 'Faded Olive Green Linen Napkins (Set of 24)',
        category: 'Other',
        price: 30,
        stock: 10,
        available: 10,
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600',
        description: 'Pre-washed soft pure European linen napkins with frayed edge detailing in a muted sage-olive color scheme.'
    },
    {
        id: 'item_11',
        name: 'Rustic Wooden Welcome Sign Board',
        category: 'Sign Boards',
        price: 45,
        stock: 4,
        available: 4,
        image: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=600',
        description: 'An elegant easel-mounted wooden welcome sign with hand-painted gold calligraphy and silk drapery.'
    },
    {
        id: 'item_12',
        name: 'Terracotta Warmth Ceremony Package',
        category: 'Packages',
        price: 399,
        stock: 2,
        available: 2,
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
        description: 'A complete luxury styling bundle: Boho Terracotta Rose Arch, 2 cozy Rattan Armchairs, a Rustic Welcome Sign, and 10 Table Runners.'
    }
];
const SPREADSHEET_NAME = 'Celebration Studio - Inventory';
const SHEET_RANGE = 'Sheet1!A1:H100';
async function findInventorySpreadsheet(accessToken) {
    const q = `name = '${SPREADSHEET_NAME}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,webViewLink)`;
    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!res.ok) {
            const errorMsg = await res.text();
            console.error('Error finding spreadsheet in Drive:', errorMsg);
            return null;
        }
        const data = await res.json();
        if (data.files && data.files.length > 0) {
            return {
                id: data.files[0].id,
                url: data.files[0].webViewLink
            };
        }
        return null;
    } catch (error) {
        console.error('Network error during spreadsheet find:', error);
        return null;
    }
}
async function createAndPopulateSpreadsheet(accessToken) {
    // 1. Create the sheet
    const createUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
    const createRes = await fetch(createUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            properties: {
                title: SPREADSHEET_NAME
            }
        })
    });
    if (!createRes.ok) {
        const errText = await createRes.text();
        throw new Error(`Failed to create Google Sheet: ${errText}`);
    }
    const sheetData = await createRes.json();
    const spreadsheetId = sheetData.spreadsheetId;
    const spreadsheetUrl = sheetData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    // 2. Format headers and default items values
    const values = [
        // Headers
        [
            'ID',
            'Name',
            'Category',
            'Price Per Day ($)',
            'Total Stock',
            'Available Stock',
            'Image URL',
            'Description'
        ],
        // Rows
        ...DEFAULT_INVENTORY_ITEMS.map((item)=>[
                item.id,
                item.name,
                item.category,
                item.price,
                item.stock,
                item.available,
                item.image,
                item.description
            ])
    ];
    // 3. Write data to Sheet1!A1
    const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:H${values.length}?valueInputOption=USER_ENTERED`;
    const updateRes = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            range: `Sheet1!A1:H${values.length}`,
            majorDimension: 'ROWS',
            values: values
        })
    });
    if (!updateRes.ok) {
        const errText = await updateRes.text();
        throw new Error(`Failed to populate default inventory items into Sheet: ${errText}`);
    }
    // 4. Auto-format the columns slightly using batchUpdate to make it look highly professional
    const formatUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
    await fetch(formatUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            requests: [
                {
                    // Freeze the header row
                    updateSheetProperties: {
                        properties: {
                            sheetId: 0,
                            gridProperties: {
                                frozenRowCount: 1
                            }
                        },
                        fields: 'gridProperties.frozenRowCount'
                    }
                },
                {
                    // Make headers bold and set text alignment to center
                    repeatCell: {
                        range: {
                            sheetId: 0,
                            startRowIndex: 0,
                            endRowIndex: 1
                        },
                        cell: {
                            userEnteredFormat: {
                                backgroundColor: {
                                    red: 0.95,
                                    green: 0.92,
                                    blue: 0.90
                                },
                                textFormat: {
                                    bold: true,
                                    fontFamily: 'Arial',
                                    fontSize: 10,
                                    foregroundColor: {
                                        red: 0.44,
                                        green: 0.35,
                                        blue: 0.29
                                    } // Terracotta style text
                                },
                                horizontalAlignment: 'CENTER'
                            }
                        },
                        fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
                    }
                },
                {
                    // Format numeric prices to currency ($)
                    repeatCell: {
                        range: {
                            sheetId: 0,
                            startRowIndex: 1,
                            startColumnIndex: 3,
                            endColumnIndex: 4
                        },
                        cell: {
                            userEnteredFormat: {
                                numberFormat: {
                                    type: 'CURRENCY',
                                    pattern: '"$"#,##0'
                                }
                            }
                        },
                        fields: 'userEnteredFormat.numberFormat'
                    }
                }
            ]
        })
    }).catch((e)=>console.error('Optional formatting failed', e));
    return {
        id: spreadsheetId,
        url: spreadsheetUrl
    };
}
async function getInventoryFromSheet(spreadsheetId, accessToken) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_RANGE}`;
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (!res.ok) {
        throw new Error(`Failed to read from spreadsheet: ${res.statusText}`);
    }
    const data = await res.json();
    const rows = data.values;
    if (!rows || rows.length <= 1) {
        return [];
    }
    // Header indices
    // ID, Name, Category, Price Per Day ($), Total Stock, Available Stock, Image URL, Description
    const items = [];
    for(let i = 1; i < rows.length; i++){
        const row = rows[i];
        if (!row[0]) continue; // Skip empty rows
        // Parse values robustly
        const priceRaw = row[3] ? String(row[3]).replace(/[^0-9.]/g, '') : '0';
        const stockRaw = row[4] ? String(row[4]).replace(/[^0-9]/g, '') : '0';
        const availableRaw = row[5] ? String(row[5]).replace(/[^0-9]/g, '') : '0';
        items.push({
            id: row[0] || `item_${i}`,
            name: row[1] || 'Unnamed Rental Item',
            category: row[2] || 'Uncategorized',
            price: parseFloat(priceRaw) || 0,
            stock: parseInt(stockRaw, 10) || 0,
            available: parseInt(availableRaw, 10) || 0,
            image: row[6] || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
            description: row[7] || ''
        });
    }
    return items;
}
async function updateSheetInventoryQuantities(spreadsheetId, accessToken, itemsToUpdate) {
    // 1. Fetch current rows to find indices
    const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_RANGE}`;
    const readRes = await fetch(readUrl, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (!readRes.ok) {
        throw new Error('Could not find item indexes. Sync aborted.');
    }
    const readData = await readRes.json();
    const rows = readData.values || [];
    if (rows.length === 0) {
        throw new Error('Spreadsheet inventory sheet is empty.');
    }
    // Map item ID -> Row Index (1-based for Google Sheets, which starts at row 1)
    const itemRowMap = new Map();
    for(let i = 0; i < rows.length; i++){
        const rowId = rows[i][0];
        if (rowId) {
            itemRowMap.set(rowId, i + 1); // Row number (1-based)
        }
    }
    // Prepare batch updates for 'Available Stock' (Column F - Index 5, which corresponds to column F in Sheet)
    const dataUpdates = [];
    for (const { itemId, deductQty } of itemsToUpdate){
        const rowIndex = itemRowMap.get(itemId);
        if (!rowIndex) {
            console.warn(`Item with ID ${itemId} was not found in the Google Sheet.`);
            continue;
        }
        // Row array from our fetched data
        const row = rows[rowIndex - 1];
        const currentAvailable = parseInt(row[5] ? String(row[5]).replace(/[^0-9]/g, '') : '0', 10);
        const newAvailable = Math.max(0, currentAvailable - deductQty);
        dataUpdates.push({
            range: `Sheet1!F${rowIndex}`,
            values: [
                [
                    newAvailable
                ]
            ]
        });
    }
    if (dataUpdates.length === 0) return;
    // 2. Submit batch update
    const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`;
    const res = await fetch(updateUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueInputOption: 'USER_ENTERED',
            data: dataUpdates
        })
    });
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to update quantities in Google Sheets: ${errText}`);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addInventoryItemToSupabase",
    ()=>addInventoryItemToSupabase,
    "deleteInventoryItemFromSupabase",
    ()=>deleteInventoryItemFromSupabase,
    "getInventoryFromSupabase",
    ()=>getInventoryFromSupabase,
    "getSupabaseClient",
    ()=>getSupabaseClient,
    "getSupabaseConfig",
    ()=>getSupabaseConfig,
    "saveOrderToSupabase",
    ()=>saveOrderToSupabase,
    "saveSupabaseConfig",
    ()=>saveSupabaseConfig,
    "seedSupabaseInventory",
    ()=>seedSupabaseInventory,
    "updateSupabaseInventoryQuantities",
    ()=>updateSupabaseInventoryQuantities,
    "uploadProductImage",
    ()=>uploadProductImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$googleSheets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/googleSheets.ts [app-client] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("lib/supabase.ts")}`;
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
;
const LOCAL_STORAGE_SUPABASE_URL_KEY = 'celebration_studio_supabase_url';
const LOCAL_STORAGE_SUPABASE_ANON_KEY = 'celebration_studio_supabase_anon_key';
function getSupabaseConfig() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const env = __TURBOPACK__import$2e$meta__.env || {};
    const url = localStorage.getItem(LOCAL_STORAGE_SUPABASE_URL_KEY) || ("TURBOPACK compile-time value", "https://zdjyknszipxgqgvcgoyc.supabase.co") || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL || null;
    const anonKey = localStorage.getItem(LOCAL_STORAGE_SUPABASE_ANON_KEY) || ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkanlrbnN6aXB4Z3FndmNnb3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNTU5OTYsImV4cCI6MjA5ODgzMTk5Nn0.MT2QLykb0s_LdRtj_-CDJgTZVYUbMkyWMSsoDhoUUaY") || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || null;
    return {
        url,
        anonKey
    };
}
function saveSupabaseConfig(url, anonKey) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (url) {
        localStorage.setItem(LOCAL_STORAGE_SUPABASE_URL_KEY, url);
    } else {
        localStorage.removeItem(LOCAL_STORAGE_SUPABASE_URL_KEY);
    }
    if (anonKey) {
        localStorage.setItem(LOCAL_STORAGE_SUPABASE_ANON_KEY, anonKey);
    } else {
        localStorage.removeItem(LOCAL_STORAGE_SUPABASE_ANON_KEY);
    }
}
function getSupabaseClient() {
    const { url, anonKey } = getSupabaseConfig();
    if (!url || !anonKey) {
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, anonKey);
}
async function getInventoryFromSupabase() {
    const client = getSupabaseClient();
    if (!client) {
        throw new Error('Supabase connection details are missing. Please configure them in Settings.');
    }
    const { data, error } = await client.from('inventory').select('*').order('id', {
        ascending: true
    });
    if (error) {
        throw new Error(`Supabase Query Error: ${error.message}`);
    }
    if (!data || data.length === 0) {
        return [];
    }
    return data.map((item)=>({
            id: item.id,
            name: item.name,
            category: item.category,
            price: Number(item.price) || 0,
            stock: Number(item.stock) || 0,
            available: Number(item.available) || 0,
            image: item.image || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
            description: item.description || ''
        }));
}
async function updateSupabaseInventoryQuantities(itemsToUpdate) {
    const client = getSupabaseClient();
    if (!client) {
        throw new Error('Supabase client not configured.');
    }
    for (const { itemId, deductQty } of itemsToUpdate){
        // 1. Fetch current available count
        const { data, error: fetchError } = await client.from('inventory').select('available').eq('id', itemId).single();
        if (fetchError) {
            console.error(`Failed to fetch current stock for item ${itemId}:`, fetchError);
            continue;
        }
        const currentAvailable = Number(data?.available) || 0;
        const newAvailable = Math.max(0, currentAvailable - deductQty);
        // 2. Perform individual stock deduction
        const { error: updateError } = await client.from('inventory').update({
            available: newAvailable
        }).eq('id', itemId);
        if (updateError) {
            throw new Error(`Failed to update stock in Supabase for ${itemId}: ${updateError.message}`);
        }
    }
}
async function saveOrderToSupabase(order) {
    const client = getSupabaseClient();
    if (!client) {
        return; // Non-blocking if offline/unconfigured
    }
    const orderPayload = {
        id: order.id,
        customer_name: order.booking.customerName,
        whatsapp_number: order.booking.whatsappNumber,
        email: order.booking.email,
        start_date: order.booking.startDate,
        end_date: order.booking.endDate,
        delivery_needed: order.booking.deliveryNeeded,
        delivery_address: order.booking.deliveryAddress || '',
        notes: order.booking.notes || '',
        total_amount: order.totalAmount,
        rental_days: order.rentalDays,
        status: order.status,
        items: order.items.map((i)=>({
                item_id: i.item.id,
                item_name: i.item.name,
                price: i.item.price,
                quantity: i.quantity
            })) // Store clean JSON representation
    };
    const { error } = await client.from('orders').insert([
        orderPayload
    ]);
    if (error) {
        console.error('Supabase logging order error:', error);
        throw new Error(`Failed to save booking order: ${error.message}`);
    }
}
async function seedSupabaseInventory() {
    const client = getSupabaseClient();
    if (!client) {
        throw new Error('Supabase connection details are missing.');
    }
    // Pre-process items to match DB rows format
    const rows = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$googleSheets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_INVENTORY_ITEMS"].map((item)=>({
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            stock: item.stock,
            available: item.available,
            image: item.image,
            description: item.description
        }));
    const { error } = await client.from('inventory').upsert(rows);
    if (error) {
        throw new Error(`Failed to seed inventory table: ${error.message}`);
    }
}
async function uploadProductImage(file) {
    const client = getSupabaseClient();
    if (!client) {
        throw new Error('Supabase client not configured.');
    }
    // Generate a random unique name for the file to prevent collisions
    const fileExt = file.name.split('.').pop() || 'png';
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `items/${fileName}`;
    const { data, error } = await client.storage.from('inventory-images').upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
    });
    if (error) {
        throw error;
    }
    // Get the public URL for the uploaded file
    const { data: publicUrlData } = client.storage.from('inventory-images').getPublicUrl(filePath);
    return publicUrlData.publicUrl;
}
async function addInventoryItemToSupabase(item) {
    const client = getSupabaseClient();
    if (!client) {
        throw new Error('Supabase client not configured.');
    }
    const { error } = await client.from('inventory').insert([
        item
    ]);
    if (error) {
        throw error;
    }
}
async function deleteInventoryItemFromSupabase(itemId) {
    const client = getSupabaseClient();
    if (!client) {
        throw new Error('Supabase client not configured.');
    }
    const { error } = await client.from('inventory').delete().eq('id', itemId);
    if (error) {
        throw error;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AdminPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminPanel",
    ()=>AdminPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const AdminPanel = ({ syncStatus, onSyncStatusChange, bankDetails, onBankDetailsChange, studioWhatsapp, onStudioWhatsappChange, inventory, onRefreshInventory })=>{
    _s();
    const [activeTab, setActiveTab] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('supabase');
    const [bankForm, setBankForm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        ...bankDetails
    });
    const [phoneForm, setPhoneForm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(studioWhatsapp);
    const [isSyncing, setIsSyncing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [successMsg, setSuccessMsg] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('');
    // Form toggles
    const [showAddForm, setShowAddForm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [isSubmitting, setIsSubmitting] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    // New item form states
    const [newItemName, setNewItemName] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('');
    const [newItemCategory, setNewItemCategory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('Backdrops');
    const [newItemPrice, setNewItemPrice] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('');
    const [newItemStock, setNewItemStock] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('');
    const [newItemDescription, setNewItemDescription] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('');
    const [newItemImageMode, setNewItemImageMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('file');
    const [newItemImageFile, setNewItemImageFile] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [newItemImageUrl, setNewItemImageUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('');
    const handleFileChange = (e)=>{
        const file = e.target.files?.[0] || null;
        setNewItemImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreviewUrl('');
        }
    };
    const toBase64 = (file)=>new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = ()=>resolve(reader.result);
            reader.onerror = (error)=>reject(error);
        });
    const handleAddItem = async (e)=>{
        e.preventDefault();
        if (!newItemName.trim() || !newItemPrice || !newItemStock) {
            setErrorMsg('Please populate name, price, and stock levels.');
            return;
        }
        setIsSubmitting(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            let finalImageUrl = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600';
            if (newItemImageMode === 'file' && newItemImageFile) {
                try {
                    // Attempt Storage Bucket upload
                    finalImageUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadProductImage"])(newItemImageFile);
                } catch (uploadErr) {
                    console.warn('Storage Bucket upload failed, falling back to base64:', uploadErr);
                    // Base64 Fallback
                    finalImageUrl = await toBase64(newItemImageFile);
                }
            } else if (newItemImageMode === 'url' && newItemImageUrl.trim()) {
                finalImageUrl = newItemImageUrl.trim();
            }
            const generatedId = `item_${Date.now()}`;
            const priceNum = parseFloat(newItemPrice) || 0;
            const stockNum = parseInt(newItemStock, 10) || 0;
            const newItem = {
                id: generatedId,
                name: newItemName.trim(),
                category: newItemCategory,
                price: priceNum,
                stock: stockNum,
                available: stockNum,
                image: finalImageUrl,
                description: newItemDescription.trim()
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addInventoryItemToSupabase"])(newItem);
            // Refresh catalog list
            await onRefreshInventory();
            setSuccessMsg('Successfully added new rental item to inventory!');
            setTimeout(()=>setSuccessMsg(''), 4000);
            // Reset form
            setNewItemName('');
            setNewItemCategory('Backdrops');
            setNewItemPrice('');
            setNewItemStock('');
            setNewItemDescription('');
            setNewItemImageFile(null);
            setNewItemImageUrl('');
            setImagePreviewUrl('');
            setShowAddForm(false);
        } catch (err) {
            console.error(err);
            setErrorMsg(`Failed to add item: ${err.message || 'Verify your Supabase write permissions.'}`);
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleDeleteItem = async (itemId, itemName)=>{
        if (!window.confirm(`Are you sure you want to delete "${itemName}" from the database?`)) {
            return;
        }
        setIsSyncing(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteInventoryItemFromSupabase"])(itemId);
            await onRefreshInventory();
            setSuccessMsg(`Successfully deleted "${itemName}" from the database.`);
            setTimeout(()=>setSuccessMsg(''), 4000);
        } catch (err) {
            console.error(err);
            setErrorMsg(`Failed to delete item: ${err.message || 'Verify database permissions.'}`);
        } finally{
            setIsSyncing(false);
        }
    };
    const [errorMsg, setErrorMsg] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('');
    // Supabase input states
    const [supabaseUrlInput, setSupabaseUrlInput] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('');
    const [supabaseAnonKeyInput, setSupabaseAnonKeyInput] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('');
    // Load configs on component mount
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AdminPanel.useEffect": ()=>{
            const { url, anonKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseConfig"])();
            setSupabaseUrlInput(url || '');
            setSupabaseAnonKeyInput(anonKey || '');
        }
    }["AdminPanel.useEffect"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AdminPanel.useEffect": ()=>{
            setBankForm({
                ...bankDetails
            });
        }
    }["AdminPanel.useEffect"], [
        bankDetails
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AdminPanel.useEffect": ()=>{
            setPhoneForm(studioWhatsapp);
        }
    }["AdminPanel.useEffect"], [
        studioWhatsapp
    ]);
    const handleSaveSupabaseConfig = (e)=>{
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');
        if (!supabaseUrlInput.trim() || !supabaseAnonKeyInput.trim()) {
            setErrorMsg('Please enter both Supabase Project URL and Anon API Key.');
            return;
        }
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveSupabaseConfig"])(supabaseUrlInput.trim(), supabaseAnonKeyInput.trim());
            onSyncStatusChange({
                supabaseUrl: supabaseUrlInput.trim(),
                connected: false,
                error: null
            });
            setSuccessMsg('Supabase credentials stored locally! Testing connection...');
            setTimeout(()=>setSuccessMsg(''), 3000);
            // Trigger instant inventory reload to verify connectivity
            handleTestConnection();
        } catch (err) {
            setErrorMsg(`Failed to save configuration: ${err.message || err}`);
        }
    };
    const handleTestConnection = async ()=>{
        setIsSyncing(true);
        onSyncStatusChange({
            loading: true,
            error: null
        });
        setErrorMsg('');
        try {
            await onRefreshInventory();
            setSuccessMsg('Successfully connected to Supabase database and synchronized live stocks!');
            setTimeout(()=>setSuccessMsg(''), 4000);
        } catch (err) {
            console.error(err);
            setErrorMsg(`Connection failed: ${err.message || 'Verify your Supabase table schema exists.'}`);
            onSyncStatusChange({
                connected: false,
                error: err.message || 'Supabase connectivity error.'
            });
        } finally{
            setIsSyncing(false);
            onSyncStatusChange({
                loading: false
            });
        }
    };
    const handleSeedDatabase = async ()=>{
        setIsSyncing(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["seedSupabaseInventory"])();
            setSuccessMsg('Database populated! Seeding completed successfully.');
            setTimeout(()=>setSuccessMsg(''), 4000);
            // Reload inventory
            await onRefreshInventory();
        } catch (err) {
            console.error(err);
            setErrorMsg(`Seeding failed: ${err.message || 'Make sure you have run the database table queries first.'}`);
        } finally{
            setIsSyncing(false);
        }
    };
    const handleSaveBank = (e)=>{
        e.preventDefault();
        onBankDetailsChange(bankForm);
        onStudioWhatsappChange(phoneForm);
        setSuccessMsg('Studio payment & WhatsApp contacts updated successfully!');
        setTimeout(()=>setSuccessMsg(''), 3000);
    };
    const sqlInventorySchema = `CREATE TABLE inventory (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock INTEGER NOT NULL,
  available INTEGER NOT NULL,
  image TEXT,
  description TEXT
);`;
    const sqlOrdersSchema = `CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  delivery_needed BOOLEAN NOT NULL,
  delivery_address TEXT,
  notes TEXT,
  total_amount NUMERIC NOT NULL,
  rental_days INTEGER NOT NULL,
  status TEXT NOT NULL,
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "admin-panel-container",
        className: "bg-white rounded-3xl p-6 md:p-8 border border-blush shadow-xs space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blush pb-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-serif-luxury text-[24px] font-bold text-gray-950 tracking-wide flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                    className: "w-6 h-6 text-terracotta"
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminPanel.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Studio Administration"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AdminPanel.tsx",
                            lineNumber: 305,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-500 font-light mt-1",
                            children: "Configure Supabase database synchronization, manual bank accounts, and WhatsApp numbers."
                        }, void 0, false, {
                            fileName: "[project]/components/AdminPanel.tsx",
                            lineNumber: 308,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AdminPanel.tsx",
                    lineNumber: 304,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/AdminPanel.tsx",
                lineNumber: 303,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            successMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn font-medium",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "w-4 h-4 text-emerald-600"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 316,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    " ",
                    successMsg
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminPanel.tsx",
                lineNumber: 315,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 animate-fadeIn font-medium",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        className: "w-4 h-4 text-red-500"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    " ",
                    errorMsg
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminPanel.tsx",
                lineNumber: 321,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex border-b border-blush/60 gap-4 text-xs font-semibold",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('supabase'),
                        className: `pb-3 relative cursor-pointer ${activeTab === 'supabase' ? 'text-terracotta border-b-2 border-terracotta' : 'text-gray-400 hover:text-gray-600'}`,
                        children: "Supabase Connection"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('bank'),
                        className: `pb-3 relative cursor-pointer ${activeTab === 'bank' ? 'text-terracotta border-b-2 border-terracotta' : 'text-gray-400 hover:text-gray-600'}`,
                        children: "Payment & Phone Setup"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('stock'),
                        className: `pb-3 relative cursor-pointer ${activeTab === 'stock' ? 'text-terracotta border-b-2 border-terracotta' : 'text-gray-400 hover:text-gray-600'}`,
                        children: "Live Inventory Rows"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminPanel.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            activeTab === 'supabase' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5 bg-blush-light rounded-2xl border border-blush flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] uppercase font-bold text-camel tracking-wider block",
                                        children: "Supabase Status"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 353,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif-luxury font-bold text-gray-900 text-lg flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                                                className: "w-5 h-5 text-terracotta"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 355,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            syncStatus.connected ? 'Connected Live' : 'Offline / Standard Memory Mode'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 354,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 font-light leading-relaxed max-w-xl",
                                        children: syncStatus.connected ? `All event rentals and stock allocations are syncing in real-time with Supabase: ${syncStatus.supabaseUrl}` : 'Currently operating in-memory. Save your Supabase connection parameters below to activate real-time synchronization.'
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminPanel.tsx",
                                lineNumber: 352,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            syncStatus.connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shrink-0 flex gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleTestConnection,
                                    disabled: isSyncing,
                                    className: "px-4 py-2.5 bg-camel hover:bg-camel-dark disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            className: `w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminPanel.tsx",
                                            lineNumber: 372,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Sync Now"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AdminPanel.tsx",
                                    lineNumber: 367,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/AdminPanel.tsx",
                                lineNumber: 366,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 351,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-5 bg-white border border-blush p-5 rounded-2xl space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-serif-luxury font-bold text-gray-950 text-sm tracking-wide",
                                        children: "Connection Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSaveSupabaseConfig,
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold text-gray-700 block",
                                                        children: "Supabase Project URL"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "https://yourprojectid.supabase.co",
                                                        value: supabaseUrlInput,
                                                        onChange: (e)=>setSupabaseUrlInput(e.target.value),
                                                        className: "w-full text-xs px-3 py-2 rounded-lg border border-blush",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 384,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold text-gray-700 block",
                                                        children: "Supabase Anon API Key"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "password",
                                                        placeholder: "eyJhbGciOi...",
                                                        value: supabaseAnonKeyInput,
                                                        onChange: (e)=>setSupabaseAnonKeyInput(e.target.value),
                                                        className: "w-full text-xs px-3 py-2 rounded-lg border border-blush font-mono",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 396,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-2 flex gap-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "flex-1 px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminPanel.tsx",
                                                            lineNumber: 413,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Save Credentials"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 408,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 383,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-4 border-t border-blush/40 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                        className: "w-4 h-4 text-camel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 421,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-bold text-gray-800",
                                                        children: "Seed Default Catalog"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 422,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 420,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-400 leading-relaxed font-light",
                                                children: "If your `inventory` table is empty, click below to insert the default exquisite catalog items (Terracotta arch, Silk runners, Lounge sofa, etc.)."
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 424,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSeedDatabase,
                                                disabled: isSyncing,
                                                className: "w-full px-4 py-2 bg-gray-50 hover:bg-blush border border-blush text-gray-700 font-semibold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50",
                                                children: "Seed Luxury Inventory"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 427,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 419,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminPanel.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-7 bg-gray-50/50 border border-blush/60 p-5 rounded-2xl space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                className: "w-5 h-5 text-camel"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 440,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-serif-luxury font-bold text-gray-950 text-sm tracking-wide",
                                                children: "SQL Schema Generation"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 441,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-gray-500 leading-relaxed font-light",
                                        children: [
                                            "To activate Supabase sync, open the ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "SQL Editor"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 444,
                                                columnNumber: 53
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " in your Supabase Dashboard and run the following queries to create the ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                children: "inventory"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 444,
                                                columnNumber: 152
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " and ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                children: "orders"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 444,
                                                columnNumber: 179
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " tables:"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 443,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 font-mono text-[10px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-gray-700 block",
                                                        children: "1. Inventory Table Query"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 449,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "bg-gray-900 text-gray-200 p-3 rounded-lg overflow-x-auto max-h-32",
                                                        children: sqlInventorySchema
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 448,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-gray-700 block",
                                                        children: "2. Orders Log Table Query"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 456,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "bg-gray-900 text-gray-200 p-3 rounded-lg overflow-x-auto max-h-32",
                                                        children: sqlOrdersSchema
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 455,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 447,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminPanel.tsx",
                                lineNumber: 438,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 378,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminPanel.tsx",
                lineNumber: 350,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            activeTab === 'bank' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSaveBank,
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif-luxury font-bold text-gray-900 text-lg flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                className: "w-5 h-5 text-emerald-600"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 475,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "WhatsApp Routing Contacts"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 474,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-semibold text-gray-700 block",
                                                children: "Studio Owner WhatsApp Number"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 480,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "e.g. +94771234567",
                                                value: phoneForm,
                                                onChange: (e)=>setPhoneForm(e.target.value),
                                                className: "w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 483,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-400 font-light",
                                                children: 'Required when customers click "Confirm via WhatsApp" from the checkout summary. Include the country code.'
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 491,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminPanel.tsx",
                                lineNumber: 473,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif-luxury font-bold text-gray-900 text-lg",
                                        children: "Manual Bank Transfer Account"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 499,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold text-gray-700 block",
                                                        children: "Bank Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: bankForm.bankName,
                                                        onChange: (e)=>setBankForm({
                                                                ...bankForm,
                                                                bankName: e.target.value
                                                            }),
                                                        className: "w-full text-xs px-3 py-2 rounded-lg border border-blush",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 504,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold text-gray-700 block",
                                                        children: "Account Holder Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: bankForm.accountName,
                                                        onChange: (e)=>setBankForm({
                                                                ...bankForm,
                                                                accountName: e.target.value
                                                            }),
                                                        className: "w-full text-xs px-3 py-2 rounded-lg border border-blush",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 515,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[11px] font-semibold text-gray-700 block",
                                                                children: "Account Number"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 528,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: bankForm.accountNumber,
                                                                onChange: (e)=>setBankForm({
                                                                        ...bankForm,
                                                                        accountNumber: e.target.value
                                                                    }),
                                                                className: "w-full text-xs px-3 py-2 rounded-lg border border-blush font-mono",
                                                                required: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 527,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[11px] font-semibold text-gray-700 block",
                                                                children: "Branch Code / Routing"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 538,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: bankForm.routingOrBranchCode,
                                                                onChange: (e)=>setBankForm({
                                                                        ...bankForm,
                                                                        routingOrBranchCode: e.target.value
                                                                    }),
                                                                className: "w-full text-xs px-3 py-2 rounded-lg border border-blush",
                                                                required: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 539,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 537,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 526,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 503,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminPanel.tsx",
                                lineNumber: 498,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 470,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4 border-t border-blush flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "px-6 py-2.5 bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md cursor-pointer",
                            children: "Save Configurations"
                        }, void 0, false, {
                            fileName: "[project]/components/AdminPanel.tsx",
                            lineNumber: 554,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 553,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminPanel.tsx",
                lineNumber: 469,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            activeTab === 'stock' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center border-b border-blush/40 pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif-luxury font-bold text-gray-900 text-lg",
                                        children: [
                                            "Live Stock Rows (",
                                            inventory.length,
                                            " items)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 569,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    syncStatus.connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-emerald-700 font-mono mt-0.5 block",
                                        children: "● Real-time synced with Supabase"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 573,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminPanel.tsx",
                                lineNumber: 568,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowAddForm(!showAddForm),
                                className: "px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white text-xs font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer",
                                children: showAddForm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminPanel.tsx",
                                            lineNumber: 584,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Close Form"
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminPanel.tsx",
                                            lineNumber: 588,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Add New Item"
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/components/AdminPanel.tsx",
                                lineNumber: 578,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 567,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    showAddForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 bg-blush-light/50 border border-blush rounded-3xl space-y-4 animate-fadeIn",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-serif-luxury font-bold text-gray-950 text-base tracking-wide flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "w-4 h-4 text-terracotta"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 598,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Add New Rental Item"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminPanel.tsx",
                                lineNumber: 597,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleAddItem,
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold text-gray-700 block",
                                                        children: "Item Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 604,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "e.g. Vintage Velvet Arch Drapery",
                                                        value: newItemName,
                                                        onChange: (e)=>setNewItemName(e.target.value),
                                                        className: "w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 605,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 603,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold text-gray-700 block",
                                                        children: "Category"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 616,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: newItemCategory,
                                                        onChange: (e)=>setNewItemCategory(e.target.value),
                                                        className: "w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Backdrops",
                                                                children: "Backdrops"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 622,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Table Runners",
                                                                children: "Table Runners"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 623,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Sign Boards",
                                                                children: "Sign Boards"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 624,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Packages",
                                                                children: "Packages"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 625,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Other",
                                                                children: "Other"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 626,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 617,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 615,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold text-gray-700 block",
                                                        children: "Price Per Day ($)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 631,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        step: "0.01",
                                                        placeholder: "e.g. 75",
                                                        value: newItemPrice,
                                                        onChange: (e)=>setNewItemPrice(e.target.value),
                                                        className: "w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 632,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 630,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold text-gray-700 block",
                                                        children: "Total Stock Qty"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 645,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "1",
                                                        placeholder: "e.g. 5",
                                                        value: newItemStock,
                                                        onChange: (e)=>setNewItemStock(e.target.value),
                                                        className: "w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 646,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 644,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 602,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[11px] font-semibold text-gray-700 block",
                                                children: "Item Description"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 659,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                placeholder: "Describe the aesthetic, colors, materials, and size...",
                                                value: newItemDescription,
                                                onChange: (e)=>setNewItemDescription(e.target.value),
                                                className: "w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white h-20 resize-none"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 660,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 658,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-blush/60 pt-4 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 text-xs font-semibold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] text-gray-700",
                                                        children: "Image Source:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 671,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-1.5 cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: "imageMode",
                                                                checked: newItemImageMode === 'file',
                                                                onChange: ()=>setNewItemImageMode('file'),
                                                                className: "accent-terracotta"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 673,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Upload Image File"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 672,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-1.5 cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: "imageMode",
                                                                checked: newItemImageMode === 'url',
                                                                onChange: ()=>setNewItemImageMode('url'),
                                                                className: "accent-terracotta"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 683,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Paste Image URL"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 682,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 670,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 lg:grid-cols-12 gap-4 items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lg:col-span-8",
                                                        children: newItemImageMode === 'file' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "w-full h-24 border-2 border-dashed border-blush-dark hover:border-camel rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors bg-white",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                            className: "w-5 h-5 text-camel"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminPanel.tsx",
                                                                            lineNumber: 699,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] text-gray-500 font-medium",
                                                                            children: "Click to select product photo"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminPanel.tsx",
                                                                            lineNumber: 700,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "file",
                                                                            accept: "image/*",
                                                                            onChange: handleFileChange,
                                                                            className: "hidden"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminPanel.tsx",
                                                                            lineNumber: 701,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                                    lineNumber: 698,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                newItemImageFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] text-gray-500 font-mono italic",
                                                                    children: [
                                                                        "File: ",
                                                                        newItemImageFile.name,
                                                                        " (",
                                                                        (newItemImageFile.size / 1024).toFixed(1),
                                                                        " KB)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                                    lineNumber: 709,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminPanel.tsx",
                                                            lineNumber: 697,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-[11px] font-semibold text-gray-700 block",
                                                                    children: "Image URL"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                                    lineNumber: 716,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    placeholder: "https://images.unsplash.com/... or base64",
                                                                    value: newItemImageUrl,
                                                                    onChange: (e)=>{
                                                                        setNewItemImageUrl(e.target.value);
                                                                        setImagePreviewUrl(e.target.value);
                                                                    },
                                                                    className: "w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                                    lineNumber: 717,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminPanel.tsx",
                                                            lineNumber: 715,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 695,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lg:col-span-4 flex justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-24 h-24 rounded-2xl border border-blush bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-inner",
                                                            children: imagePreviewUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: imagePreviewUrl,
                                                                alt: "Item Preview",
                                                                className: "w-full h-full object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 735,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[9px] text-gray-400 font-medium",
                                                                children: "No Preview"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminPanel.tsx",
                                                                lineNumber: 741,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminPanel.tsx",
                                                            lineNumber: 733,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 732,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 694,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 669,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-2 flex justify-end",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: isSubmitting,
                                            className: "px-6 py-2.5 bg-terracotta hover:bg-terracotta-dark disabled:opacity-50 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer",
                                            children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                        className: "w-3.5 h-3.5 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 756,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " Adding Item..."
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 760,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " Save to Supabase"
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminPanel.tsx",
                                            lineNumber: 749,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 748,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminPanel.tsx",
                                lineNumber: 601,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 596,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto border border-blush rounded-2xl bg-white shadow-xs",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-xs text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-blush text-gray-700 uppercase text-[10px] tracking-wider font-semibold",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-5 py-3",
                                                children: "Photo"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 774,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-5 py-3",
                                                children: "Item Name"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 775,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-5 py-3",
                                                children: "Category"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 776,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-5 py-3 text-right",
                                                children: "Rent/Day"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 777,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-5 py-3 text-center",
                                                children: "Total Stock"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 778,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-5 py-3 text-center",
                                                children: "Available Stock"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 779,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-5 py-3 text-center",
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminPanel.tsx",
                                                lineNumber: 780,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 773,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminPanel.tsx",
                                    lineNumber: 772,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-blush/60 text-gray-600 font-light",
                                    children: inventory.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 7,
                                            className: "px-5 py-8 text-center text-gray-400 italic",
                                            children: 'No items currently in inventory. Click "+ Add New Item" or "Seed Luxury Inventory" to get started.'
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminPanel.tsx",
                                            lineNumber: 786,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminPanel.tsx",
                                        lineNumber: 785,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : inventory.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-blush-light/30 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-5 py-2.5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-lg overflow-hidden border border-blush/80 shadow-xs bg-gray-50 flex items-center justify-center shrink-0",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: item.image,
                                                            alt: item.name,
                                                            className: "w-full h-full object-cover",
                                                            onError: (e)=>{
                                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=100';
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminPanel.tsx",
                                                            lineNumber: 795,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                    lineNumber: 793,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-5 py-3.5 font-medium text-gray-900",
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                    lineNumber: 805,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-5 py-3.5",
                                                    children: item.category
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                    lineNumber: 806,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-5 py-3.5 text-right font-mono font-medium",
                                                    children: [
                                                        "$",
                                                        item.price
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                    lineNumber: 807,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-5 py-3.5 text-center font-mono",
                                                    children: item.stock
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                    lineNumber: 808,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-5 py-3.5 text-center font-mono",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-2 py-0.5 rounded-sm font-semibold ${item.available <= 0 ? 'bg-red-50 text-red-600' : 'bg-olive/10 text-olive-dark'}`,
                                                        children: item.available
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                    lineNumber: 809,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-5 py-3.5 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleDeleteItem(item.id, item.name),
                                                        disabled: isSyncing,
                                                        className: "p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer inline-flex items-center justify-center",
                                                        title: "Delete Item",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminPanel.tsx",
                                                            lineNumber: 821,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminPanel.tsx",
                                                        lineNumber: 815,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminPanel.tsx",
                                                    lineNumber: 814,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, item.id, true, {
                                            fileName: "[project]/components/AdminPanel.tsx",
                                            lineNumber: 792,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminPanel.tsx",
                                    lineNumber: 783,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AdminPanel.tsx",
                            lineNumber: 771,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/AdminPanel.tsx",
                        lineNumber: 770,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminPanel.tsx",
                lineNumber: 566,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/AdminPanel.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AdminPanel, "d13+FzVLBSg2rZVUR5iC99cFHNA=");
_c = AdminPanel;
var _c;
__turbopack_context__.k.register(_c, "AdminPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AdminPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$googleSheets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/googleSheets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const LOCAL_STORAGE_BANK_KEY = 'celebration_studio_bank';
const LOCAL_STORAGE_WHATSAPP_KEY = 'celebration_studio_whatsapp';
const DEFAULT_BANK_DETAILS = {
    bankName: 'Bank of Ceylon (BOC)',
    accountName: 'Celebration Studio Pvt Ltd',
    accountNumber: '8492049282',
    routingOrBranchCode: '082 - Colombo Grand Branch',
    accountType: 'Current Account'
};
const DEFAULT_STUDIO_WHATSAPP = '+94771234567';
function AdminApp() {
    _s();
    const [bankDetails, setBankDetails] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(DEFAULT_BANK_DETAILS);
    const [studioWhatsapp, setStudioWhatsapp] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(DEFAULT_STUDIO_WHATSAPP);
    const [syncStatus, setSyncStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        "AdminApp.useState": ()=>{
            const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseConfig"])();
            return {
                connected: false,
                supabaseUrl: config.url,
                lastSynced: null,
                loading: false,
                error: null
            };
        }
    }["AdminApp.useState"]);
    const [inventory, setInventory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$googleSheets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_INVENTORY_ITEMS"]);
    const [isInventoryLoading, setIsInventoryLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    // Sync / Load inventory from Supabase
    const fetchInventory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "AdminApp.useCallback[fetchInventory]": async ()=>{
            setIsInventoryLoading(true);
            setSyncStatus({
                "AdminApp.useCallback[fetchInventory]": (prev)=>({
                        ...prev,
                        loading: true,
                        error: null
                    })
            }["AdminApp.useCallback[fetchInventory]"]);
            try {
                const items = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInventoryFromSupabase"])();
                if (items && items.length > 0) {
                    setInventory(items);
                    setSyncStatus({
                        "AdminApp.useCallback[fetchInventory]": (prev)=>({
                                ...prev,
                                connected: true,
                                lastSynced: new Date().toLocaleTimeString(),
                                loading: false,
                                error: null
                            })
                    }["AdminApp.useCallback[fetchInventory]"]);
                } else {
                    setInventory(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$googleSheets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_INVENTORY_ITEMS"]);
                    setSyncStatus({
                        "AdminApp.useCallback[fetchInventory]": (prev)=>({
                                ...prev,
                                connected: true,
                                lastSynced: new Date().toLocaleTimeString(),
                                loading: false,
                                error: null
                            })
                    }["AdminApp.useCallback[fetchInventory]"]);
                }
            } catch (err) {
                console.warn('Failed to load inventory from Supabase:', err);
                setInventory(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$googleSheets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_INVENTORY_ITEMS"]);
                setSyncStatus({
                    "AdminApp.useCallback[fetchInventory]": (prev)=>({
                            ...prev,
                            connected: false,
                            loading: false,
                            error: err.message || 'Supabase config missing or incorrect schema.'
                        })
                }["AdminApp.useCallback[fetchInventory]"]);
            } finally{
                setIsInventoryLoading(false);
            }
        }
    }["AdminApp.useCallback[fetchInventory]"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AdminApp.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const savedBank = localStorage.getItem(LOCAL_STORAGE_BANK_KEY);
                if (savedBank) {
                    try {
                        setBankDetails(JSON.parse(savedBank));
                    } catch (e) {
                        console.error(e);
                    }
                }
                const savedWhatsapp = localStorage.getItem(LOCAL_STORAGE_WHATSAPP_KEY);
                if (savedWhatsapp) {
                    setStudioWhatsapp(savedWhatsapp);
                }
            }
        }
    }["AdminApp.useEffect"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AdminApp.useEffect": ()=>{
            fetchInventory();
        }
    }["AdminApp.useEffect"], [
        fetchInventory
    ]);
    const handleBankDetailsChange = (details)=>{
        setBankDetails(details);
        localStorage.setItem(LOCAL_STORAGE_BANK_KEY, JSON.stringify(details));
    };
    const handleStudioWhatsappChange = (phone)=>{
        setStudioWhatsapp(phone);
        localStorage.setItem(LOCAL_STORAGE_WHATSAPP_KEY, phone);
    };
    const handleSyncStatusChange = (statusUpdates)=>{
        setSyncStatus((prev)=>({
                ...prev,
                ...statusUpdates
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-blush-light text-gray-900 font-sans p-6 md:p-12 max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full overflow-hidden bg-blush border border-blush/80 flex items-center justify-center shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/2.png",
                                    alt: "Celebration Studio mini logo",
                                    className: "w-full h-full object-cover",
                                    onError: (e)=>{
                                        e.currentTarget.style.display = 'none';
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-serif-luxury font-bold text-gray-950 text-sm tracking-widest block leading-none",
                                children: "CELEBRATION STUDIO ADMIN"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/",
                        className: "px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase border border-blush bg-white text-gray-600 hover:bg-blush-light transition-all",
                        children: "View Storefront"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminPanel"], {
                user: null,
                token: null,
                onAuthChange: ()=>{},
                syncStatus: syncStatus,
                onSyncStatusChange: handleSyncStatusChange,
                bankDetails: bankDetails,
                onBankDetailsChange: handleBankDetailsChange,
                studioWhatsapp: studioWhatsapp,
                onStudioWhatsappChange: handleStudioWhatsappChange,
                inventory: inventory,
                onRefreshInventory: fetchInventory
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/page.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_s(AdminApp, "62WxOkGfS1PiovM2rDjlWK4Jt5Y=");
_c = AdminApp;
var _c;
__turbopack_context__.k.register(_c, "AdminApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_058ixu8._.js.map