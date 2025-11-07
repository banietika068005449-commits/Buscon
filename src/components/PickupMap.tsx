import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { LatLngBounds } from 'leaflet';
import { PickupPoint } from '../types';

// Custom hook to handle map view changes
const ChangeView: React.FC<{ bounds: LatLngBounds }> = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds.isValid()) {
            map.flyToBounds(bounds, { padding: [50, 50], duration: 1 });
        }
    }, [bounds, map]);
    return null;
}

// Create custom icons
const createIcon = (url: string) => new L.Icon({
    iconUrl: url,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const defaultIcon = createIcon('https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png');
const selectedIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png');
const disabledIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png');


interface PickupMapProps {
    points: PickupPoint[];
    selectedPointId: string | null;
    onSelectPoint: (id: string) => void;
}

const PickupMap: React.FC<PickupMapProps> = ({ points, selectedPointId, onSelectPoint }) => {
    
    const bounds = useMemo(() => {
        const latLngs = points.map(p => p.coordinates as L.LatLngExpression);
        return new L.LatLngBounds(latLngs);
    }, [points]);

    return (
        <MapContainer bounds={bounds} scrollWheelZoom={false} className="h-full w-full z-0">
            <ChangeView bounds={bounds} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points.map((point) => {
                const isSelected = point.id === selectedPointId;
                const isDisabled = point.places_dispo === 0;
                let icon = defaultIcon;
                if (isSelected) icon = selectedIcon;
                if (isDisabled) icon = disabledIcon;

                return (
                    <Marker
                        key={point.id}
                        position={point.coordinates}
                        icon={icon}
                        opacity={isDisabled ? 0.6 : 1}
                        eventHandlers={{
                            click: () => {
                                if (!isDisabled) {
                                    onSelectPoint(point.id);
                                }
                            },
                        }}
                    >
                        <Popup>
                            <div className="font-sans">
                                <b className="font-bold">{point.nom}</b><br />
                                Heure: {point.horaire_passage}<br />
                                Places: {point.places_dispo}
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default PickupMap;
