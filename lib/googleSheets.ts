import { RentalItem } from '../types';

// Default gorgeous, cozy luxury rental items matching the requested color themes
export const DEFAULT_INVENTORY_ITEMS: RentalItem[] = [
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

/**
 * Searches the user's Google Drive for an existing spreadsheet named "Celebration Studio - Inventory"
 */
export async function findInventorySpreadsheet(accessToken: string): Promise<{ id: string; url: string } | null> {
  const q = `name = '${SPREADSHEET_NAME}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,webViewLink)`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
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

/**
 * Creates a brand new Google Sheet in the user's Drive with the name "Celebration Studio - Inventory"
 * and populates it with default luxury rental items.
 */
export async function createAndPopulateSpreadsheet(accessToken: string): Promise<{ id: string; url: string }> {
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
    ['ID', 'Name', 'Category', 'Price Per Day ($)', 'Total Stock', 'Available Stock', 'Image URL', 'Description'],
    // Rows
    ...DEFAULT_INVENTORY_ITEMS.map(item => [
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
                backgroundColor: { red: 0.95, green: 0.92, blue: 0.90 }, // Soft Blush Beige background
                textFormat: {
                  bold: true,
                  fontFamily: 'Arial',
                  fontSize: 10,
                  foregroundColor: { red: 0.44, green: 0.35, blue: 0.29 } // Terracotta style text
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
  }).catch(e => console.error('Optional formatting failed', e));

  return {
    id: spreadsheetId,
    url: spreadsheetUrl
  };
}

/**
 * Fetches inventory list from Google Sheets.
 * If errors or missing auth, falls back to default items.
 */
export async function getInventoryFromSheet(spreadsheetId: string, accessToken: string): Promise<RentalItem[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_RANGE}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
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
  const items: RentalItem[] = [];

  for (let i = 1; i < rows.length; i++) {
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

/**
 * Deducts quantities rented in the Google Sheet database.
 * Does a batch cell update for safety.
 */
export async function updateSheetInventoryQuantities(
  spreadsheetId: string, 
  accessToken: string, 
  itemsToUpdate: { itemId: string; deductQty: number }[]
): Promise<void> {
  // 1. Fetch current rows to find indices
  const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_RANGE}`;
  const readRes = await fetch(readUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!readRes.ok) {
    throw new Error('Could not find item indexes. Sync aborted.');
  }

  const readData = await readRes.json();
  const rows: any[][] = readData.values || [];

  if (rows.length === 0) {
    throw new Error('Spreadsheet inventory sheet is empty.');
  }

  // Map item ID -> Row Index (1-based for Google Sheets, which starts at row 1)
  const itemRowMap = new Map<string, number>();
  for (let i = 0; i < rows.length; i++) {
    const rowId = rows[i][0];
    if (rowId) {
      itemRowMap.set(rowId, i + 1); // Row number (1-based)
    }
  }

  // Prepare batch updates for 'Available Stock' (Column F - Index 5, which corresponds to column F in Sheet)
  const dataUpdates = [];

  for (const { itemId, deductQty } of itemsToUpdate) {
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
      values: [[newAvailable]]
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
