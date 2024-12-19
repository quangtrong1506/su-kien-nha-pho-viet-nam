import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number, callback?: (value: T) => void): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            callback?.(value); // Gọi callback sau khi debounce
        }, delay);

        return () => clearTimeout(handler); // Hủy bỏ timeout nếu value thay đổi
    }, [value, delay, callback]);

    return debouncedValue;
};

export default useDebounce;
