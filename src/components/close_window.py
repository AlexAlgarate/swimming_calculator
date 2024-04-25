import tkinter as tk
from functools import partial
from typing import Dict


class CloseWindowButton(tk.Button):
    """
    A close button for the tkinter window.
    """

    def __init__(
        self,
        parent: tk.Tk,
        button_text: str,
        root: tk.Tk,
        place_params: Dict[str, float] = None,
    ):
        """
        Initialize the CloseWindowButton.

        Parameters:
            parent (tk.Tk): The parent tkinter window.
            button_text (str): The text to display on the button.
            root (tk.Tk): The root window to close.
            place_params (Dict[str, float]): Parameters for button placement.
                Should include 'relx', 'rely', 'relheight', and 'relwidth'.
        """
        if place_params is None:
            place_params = {
                "relx": 0.85,
                "rely": 0.85,
                "relheight": 0.1,
                "relwidth": 0.1,
            }
        super().__init__(
            parent,
            text=button_text,
            command=partial(self._close_window, root),
        )
        self.place(**place_params)

    @staticmethod
    def _close_window(root: tk.Tk):
        """
        Close the root window.

        Parameters:
            root (tk.Tk): The root window to close.
        """
        root.destroy()
