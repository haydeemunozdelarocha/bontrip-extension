export interface ImageGridProps {
    images: string[];
    onSelect: (e: MouseEvent) => void;
    selectedImageUrl: string;
}
