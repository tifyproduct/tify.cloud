import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { fetchIndicatorData } from '@/services/fredapi';
import IndicatorCard from '@/components/macro/IndicatorCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const MacroEconomicTab = ({ region, indicators }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadData = useCallback(async () => {
    setLoading(true);
    toast({ title: 'Fetching Data...', description: `Loading ${region} economic indicators.` });

    try {
      const promises = indicators.map(indicator => fetchIndicatorData(indicator));
      const results = await Promise.allSettled(promises);
      
      const newData = {};
      let allRequestsSucceeded = true;

      results.forEach((result, index) => {
        const indicatorId = indicators[index];
        if (result.status === 'fulfilled' && result.value && !result.value.units?.includes("Mock Data")) {
          newData[indicatorId] = result.value;
        } else {
          allRequestsSucceeded = false;
          // Use mock data from result.value if API call failed inside fetchIndicatorData
          newData[indicatorId] = result.status === 'fulfilled' ? result.value : { error: 'Failed to fetch' };
          console.error(`Failed to fetch ${indicatorId}:`, result.reason || "Using mock data fallback.");
        }
      });

      setData(newData);
      
      if (allRequestsSucceeded) {
        toast({ title: 'Success!', description: 'Economic data updated successfully.', variant: 'success' });
      } else {
        toast({ title: 'Partial Data', description: 'Some indicators failed to load and are showing mock data.', variant: 'default' });
      }

    } catch (error) {
      toast({ title: 'Error', description: 'An unexpected error occurred while fetching data.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [region, indicators, toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="space-y-6 mt-4">
      <div className="flex justify-end">
        <Button onClick={loadData} disabled={loading} variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {indicators.map(indicator => (
          <IndicatorCard key={indicator} seriesId={indicator} data={data[indicator]} />
        ))}
      </div>
    </div>
  );
};

export default MacroEconomicTab;