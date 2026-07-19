"use client";

import React, { useState } from "react";
import { Trip } from "@/types";
import { tripService } from "@/services/trip.service";
import { Edit2, Save, Trash2, Plus, Sparkles, CheckSquare, Square, X } from "lucide-react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface TabProps {
  trip: Trip;
  onUpdate: (updatedTrip: Trip) => void;
}

// ==========================================
// 1. ITINERARY TAB Component
// ==========================================
export function ItineraryTab({ trip, onUpdate }: TabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [itinerary, setItinerary] = useState(trip.itinerary || []);
  const [saving, setSaving] = useState(false);

  const handleFieldChange = (index: number, field: "title" | "activities", value: string) => {
    const updated = [...itinerary];
    if (field === "title") {
      updated[index] = { ...updated[index], title: value };
    } else {
      updated[index] = { ...updated[index], activities: value.split("\n").filter(a => a.trim() !== "") };
    }
    setItinerary(updated);
  };

  const handleAddDay = () => {
    setItinerary([
      ...itinerary,
      { day: itinerary.length + 1, title: `New Day ${itinerary.length + 1}`, activities: [] }
    ]);
  };

  const handleRemoveDay = (index: number) => {
    const updated = itinerary.filter((_, idx) => idx !== index).map((day, idx) => ({
      ...day,
      day: idx + 1
    }));
    setItinerary(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await tripService.updateTrip(trip._id, { itinerary });
      if (res.success && res.data) {
        onUpdate(res.data);
        setIsEditing(false);
        toast.success("Itinerary updated!");
      }
    } catch {
      toast.error("Failed to update itinerary.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Itinerary Schedule</h3>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => { setItinerary(trip.itinerary || []); setIsEditing(false); }} disabled={saving} className="gap-1.5 h-9 rounded-lg">
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave} disabled={saving} className="gap-1.5 h-9 rounded-lg">
                {saving ? (
                  <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin shrink-0" />
                ) : (
                  <Save className="h-4 w-4 text-white" />
                )}
                <span>{saving ? "Saving..." : "Save"}</span>
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-1.5 h-9 rounded-lg">
              <Edit2 className="h-4 w-4" />
              <span>Edit Itinerary</span>
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {itinerary.map((day, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-3 relative group">
            {isEditing && (
              <button
                onClick={() => handleRemoveDay(idx)}
                className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
                title="Remove Day"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}

            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary text-sm font-extrabold">
                {day.day}
              </div>
              <div className="flex-1 space-y-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => handleFieldChange(idx, "title", e.target.value)}
                    className="w-full bg-background border border-border focus:border-primary focus:outline-none rounded-xl px-3 py-2 text-sm font-bold"
                    placeholder="Day Title"
                  />
                ) : (
                  <h4 className="text-sm font-extrabold text-foreground">{day.title}</h4>
                )}

                {isEditing ? (
                  <textarea
                    rows={3}
                    value={day.activities.join("\n")}
                    onChange={(e) => handleFieldChange(idx, "activities", e.target.value)}
                    className="w-full bg-background border border-border focus:border-primary focus:outline-none rounded-xl px-3 py-2 text-xs leading-relaxed text-muted-foreground"
                    placeholder="Activities (one per line)"
                  />
                ) : (
                  <ul className="space-y-1.5 pl-1.5 list-disc list-inside">
                    {day.activities.map((activity, aIdx) => (
                      <li key={aIdx} className="text-xs text-muted-foreground leading-relaxed">
                        {activity}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}

        {isEditing && (
          <button
            onClick={handleAddDay}
            className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-dashed border-border hover:border-primary/40 rounded-2xl text-xs font-bold text-muted-foreground hover:text-primary transition-all duration-300 bg-muted/20 hover:bg-muted/40 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add day to Schedule</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. BUDGET BREAKDOWN TAB Component
// ==========================================
export function BudgetBreakdownTab({ trip, onUpdate }: TabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [breakdown, setBreakdown] = useState(trip.budgetBreakdown || {
    accommodation: 0,
    food: 0,
    transport: 0,
    activities: 0,
    miscellaneous: 0
  });

  const handleFieldChange = (field: keyof typeof breakdown, value: number) => {
    setBreakdown({
      ...breakdown,
      [field]: value
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await tripService.updateTrip(trip._id, { budgetBreakdown: breakdown });
      if (res.success && res.data) {
        onUpdate(res.data);
        setIsEditing(false);
        toast.success("Budget breakdown updated!");
      }
    } catch {
      toast.error("Failed to update budget breakdown.");
    } finally {
      setSaving(false);
    }
  };

  const categories = [
    { key: "accommodation" as const, label: "Accommodation" },
    { key: "transport" as const, label: "Transport" },
    { key: "food" as const, label: "Food" },
    { key: "activities" as const, label: "Activities" },
    { key: "miscellaneous" as const, label: "Miscellaneous" }
  ];

  const totalBreakdown = Object.values(breakdown).reduce((sum, v) => sum + v, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Budget Allocation</h3>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => { setBreakdown(trip.budgetBreakdown || { accommodation: 0, food: 0, transport: 0, activities: 0, miscellaneous: 0 }); setIsEditing(false); }} disabled={saving} className="gap-1.5 h-9 rounded-lg">
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave} disabled={saving} className="gap-1.5 h-9 rounded-lg">
                {saving ? (
                  <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin shrink-0" />
                ) : (
                  <Save className="h-4 w-4 text-white" />
                )}
                <span>{saving ? "Saving..." : "Save"}</span>
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-1.5 h-9 rounded-lg">
              <Edit2 className="h-4 w-4" />
              <span>Edit Budget</span>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Allocated Category Expenses</h4>
          <div className="space-y-3.5">
            {categories.map((cat) => (
              <div key={cat.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">{cat.label}</span>
                  {isEditing ? (
                    <div className="flex items-center gap-1.5 bg-background border border-border rounded-lg px-2 py-1 max-w-[120px]">
                      <span className="text-muted-foreground">₹</span>
                      <input
                        type="number"
                        value={breakdown[cat.key]}
                        onChange={(e) => handleFieldChange(cat.key, Number(e.target.value))}
                        className="w-full bg-transparent focus:outline-none text-right font-bold text-foreground text-xs"
                      />
                    </div>
                  ) : (
                    <span className="text-foreground">₹{breakdown[cat.key].toLocaleString("en-IN")}</span>
                  )}
                </div>

                {!isEditing && totalBreakdown > 0 && (
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden border border-border/40">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(breakdown[cat.key] / totalBreakdown) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Budget Balance Sheet</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Comparison between your designated limit budget and allocated estimated category plans.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Global Trip Budget</span>
              <span className="text-foreground">₹{trip.budget.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Total Allocated</span>
              <span className="text-foreground">₹{totalBreakdown.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Difference</span>
              <span className={trip.budget - totalBreakdown < 0 ? "text-red-500 font-bold" : "text-secondary font-bold"}>
                ₹{(trip.budget - totalBreakdown).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. PACKING CHECKLIST TAB Component
// ==========================================
export function PackingChecklistTab({ trip, onUpdate }: TabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [packingList, setPackingList] = useState(trip.packingList || []);
  const [newItem, setNewItem] = useState("");

  // Track checked state locally
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem(`packing_${trip._id}`);
    return saved ? JSON.parse(saved) : {};
  });

  const toggleCheck = (item: string) => {
    const updated = { ...checkedItems, [item]: !checkedItems[item] };
    setCheckedItems(updated);
    localStorage.setItem(`packing_${trip._id}`, JSON.stringify(updated));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    if (packingList.includes(newItem.trim())) {
      toast.error("Item already in checklist!");
      return;
    }
    setPackingList([...packingList, newItem.trim()]);
    setNewItem("");
  };

  const handleRemoveItem = (index: number) => {
    const removedItem = packingList[index];
    const updated = packingList.filter((_, idx) => idx !== index);
    setPackingList(updated);

    // Clean up checked cache
    const updatedChecked = { ...checkedItems };
    delete updatedChecked[removedItem];
    setCheckedItems(updatedChecked);
    localStorage.setItem(`packing_${trip._id}`, JSON.stringify(updatedChecked));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await tripService.updateTrip(trip._id, { packingList });
      if (res.success && res.data) {
        onUpdate(res.data);
        setIsEditing(false);
        toast.success("Checklist updated!");
      }
    } catch {
      toast.error("Failed to update checklist.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Smart Packing Checklist</h3>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => { setPackingList(trip.packingList || []); setIsEditing(false); }} disabled={saving} className="gap-1.5 h-9 rounded-lg">
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave} disabled={saving} className="gap-1.5 h-9 rounded-lg">
                {saving ? (
                  <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin shrink-0" />
                ) : (
                  <Save className="h-4 w-4 text-white" />
                )}
                <span>{saving ? "Saving..." : "Save"}</span>
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-1.5 h-9 rounded-lg">
              <Edit2 className="h-4 w-4" />
              <span>Edit List</span>
            </Button>
          )}
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        {isEditing && (
          <form onSubmit={handleAddItem} className="flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="flex-1 bg-background border border-border focus:border-primary focus:outline-none rounded-xl px-3.5 py-2 text-xs"
              placeholder="Add item (e.g. Toothbrush)"
            />
            <Button type="submit" variant="primary" size="sm" className="h-9 px-4 rounded-xl font-bold flex items-center gap-1 text-xs shrink-0">
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </Button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
          {packingList.map((item, idx) => {
            const checked = checkedItems[item] || false;
            return (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border transition-all duration-300 select-none",
                  checked
                    ? "bg-muted/30 border-border/50 opacity-60"
                    : "bg-card hover:bg-muted/15 border-border shadow-sm"
                )}
              >
                <div
                  className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
                  onClick={() => !isEditing && toggleCheck(item)}
                >
                  {checked ? (
                    <CheckSquare className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <Square className="h-4 w-4 text-muted-foreground/60 shrink-0" />
                  )}
                  <span className={cn("text-xs font-semibold truncate", checked && "line-through text-muted-foreground")}>
                    {item}
                  </span>
                </div>

                {isEditing && (
                  <button
                    onClick={() => handleRemoveItem(idx)}
                    className="p-1 hover:text-red-500 rounded transition-colors ml-2"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}

          {packingList.length === 0 && (
            <div className="col-span-full py-8 text-center text-xs text-muted-foreground">
              No items in checklist. Click Edit List to populate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. LOCAL FOODS TAB Component
// ==========================================
export function LocalFoodsTab({ trip, onUpdate }: TabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [localFoods, setLocalFoods] = useState(trip.localFoods || []);
  const [newFood, setNewFood] = useState("");

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFood.trim()) return;
    if (localFoods.includes(newFood.trim())) return;
    setLocalFoods([...localFoods, newFood.trim()]);
    setNewFood("");
  };

  const handleRemoveFood = (index: number) => {
    setLocalFoods(localFoods.filter((_, idx) => idx !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await tripService.updateTrip(trip._id, { localFoods });
      if (res.success && res.data) {
        onUpdate(res.data);
        setIsEditing(false);
        toast.success("Food recommendations updated!");
      }
    } catch {
      toast.error("Failed to update foods.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Local Food Recommendations</h3>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => { setLocalFoods(trip.localFoods || []); setIsEditing(false); }} disabled={saving} className="gap-1.5 h-9 rounded-lg">
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave} disabled={saving} className="gap-1.5 h-9 rounded-lg">
                {saving ? (
                  <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin shrink-0" />
                ) : (
                  <Save className="h-4 w-4 text-white" />
                )}
                <span>{saving ? "Saving..." : "Save"}</span>
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-1.5 h-9 rounded-lg">
              <Edit2 className="h-4 w-4" />
              <span>Edit Foods</span>
            </Button>
          )}
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        {isEditing && (
          <form onSubmit={handleAddFood} className="flex gap-2">
            <input
              type="text"
              value={newFood}
              onChange={(e) => setNewFood(e.target.value)}
              className="flex-1 bg-background border border-border focus:border-primary focus:outline-none rounded-xl px-3.5 py-2 text-xs"
              placeholder="Add food (e.g. Dal Baati Churma)"
            />
            <Button type="submit" variant="primary" size="sm" className="h-9 px-4 rounded-xl font-bold flex items-center gap-1 text-xs shrink-0">
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </Button>
          </form>
        )}

        <div className="space-y-3">
          {localFoods.map((food, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/40">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-accent shrink-0 animate-pulse" />
                <span className="text-xs font-semibold text-foreground">{food}</span>
              </div>

              {isEditing && (
                <button
                  onClick={() => handleRemoveFood(idx)}
                  className="p-1 hover:text-red-500 rounded transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}

          {localFoods.length === 0 && (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No recommendations listed. Click Edit Foods to add recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. TRAVEL TIPS TAB Component
// ==========================================
export function TravelTipsTab({ trip, onUpdate }: TabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [travelTips, setTravelTips] = useState(trip.travelTips || []);
  const [newTip, setNewTip] = useState("");

  const handleAddTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTip.trim()) return;
    if (travelTips.includes(newTip.trim())) return;
    setTravelTips([...travelTips, newTip.trim()]);
    setNewTip("");
  };

  const handleRemoveTip = (index: number) => {
    setTravelTips(travelTips.filter((_, idx) => idx !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await tripService.updateTrip(trip._id, { travelTips });
      if (res.success && res.data) {
        onUpdate(res.data);
        setIsEditing(false);
        toast.success("Travel tips updated!");
      }
    } catch {
      toast.error("Failed to update travel tips.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Mitra AI Smart Tips</h3>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => { setTravelTips(trip.travelTips || []); setIsEditing(false); }} disabled={saving} className="gap-1.5 h-9 rounded-lg">
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave} disabled={saving} className="gap-1.5 h-9 rounded-lg">
                {saving ? (
                  <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin shrink-0" />
                ) : (
                  <Save className="h-4 w-4 text-white" />
                )}
                <span>{saving ? "Saving..." : "Save"}</span>
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-1.5 h-9 rounded-lg">
              <Edit2 className="h-4 w-4" />
              <span>Edit Tips</span>
            </Button>
          )}
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        {isEditing && (
          <form onSubmit={handleAddTip} className="flex gap-2">
            <input
              type="text"
              value={newTip}
              onChange={(e) => setNewTip(e.target.value)}
              className="flex-1 bg-background border border-border focus:border-primary focus:outline-none rounded-xl px-3.5 py-2 text-xs"
              placeholder="Add smart travel tip"
            />
            <Button type="submit" variant="primary" size="sm" className="h-9 px-4 rounded-xl font-bold flex items-center gap-1 text-xs shrink-0">
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </Button>
          </form>
        )}

        <div className="space-y-3">
          {travelTips.map((tip, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-card border border-border/80 flex items-start gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-secondary/10 text-secondary text-[10px] font-black">
                {idx + 1}
              </div>
              <div className="flex-1 text-xs leading-relaxed text-muted-foreground">
                {tip}
              </div>

              {isEditing && (
                <button
                  onClick={() => handleRemoveTip(idx)}
                  className="p-1 hover:text-red-500 rounded transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}

          {travelTips.length === 0 && (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No recommendations listed. Click Edit Tips to add travel suggestions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
